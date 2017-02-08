import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockMarketMapTransitionController from "app/component/block/block-market-map/BlockMarketMapTransitionController";
import IBlockMarketMapOptions from "app/component/block/block-market-map/IBlockMarketMapOptions";
import BlockMarketMapViewModel from "app/component/block/block-market-map/BlockMarketMapViewModel";
import Log from "lib/temple/util/Log";
import configManagerInstance from "../../../../lib/temple/config/configManagerInstance";
import {PropertyNames} from "../../../data/enum/ConfigNames";
import LoadJSONTask from "../../../../lib/temple/control/sequence/task/loader/LoadJSONTask";
import Promise = require("bluebird");
import Layer = mapboxgl.Layer;
import Map = mapboxgl.Map;
import BackgroundLayout = mapboxgl.BackgroundLayout;
import FillLayout = mapboxgl.FillLayout;
import GeoJSONSource = mapboxgl.GeoJSONSource;
import FeatureCollection = GeoJSON.FeatureCollection;
import IState from "./interface/IMarketDetail";
import Feature = GeoJSON.Feature;
import Scrollbar from "../../../../lib/temple/component/Scrollbar";
import StateModel from "../../../data/model/StateModel";
import DataManager from "../../../data/DataManager";
import PanelBlocks from "../../../data/enum/block/PanelBlocks";
import IMarketDetail from "./interface/IMarketDetail";

class BlockMarketMapController extends AbstractBlockComponentController<BlockMarketMapViewModel, IBlockMarketMapOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockMarketMap');

	private _featureCollection: FeatureCollection;
	private _marketFeatureCollection: {[id: string]: Feature} = {};

	private _map: mapboxgl.Map;
	private _marketsOutlineLayer: mapboxgl.Map;
	private _marketsFillLayer: mapboxgl.Map;

	private _stateModel: StateModel = DataManager.getInstance().settingsModel.stateModel;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		// Set the access token
		mapboxgl.accessToken = configManagerInstance.getProperty(PropertyNames.MAPBOX_ACCESS_TOKEN);
	}

	/**
	 * @public
	 * @method openContactPanel
	 */
	public openContactPanel(): void
	{
		DataManager.getInstance().panelController.transitionIn(PanelBlocks.CONTACT);
	}

	/**
	 * @public
	 * @method zoomIn
	 */
	public zoomIn():void
	{
		this._map.zoomIn()
	}

	/**
	 * @public
	 * @method zoomOut
	 */
	public zoomOut():void
	{
		this._map.zoomOut()
	}

	/**
	 * @private
	 * @method updateDataLayer
	 */
	public updateDataLayer(): void
	{
		// Get the state
		const selectedState = this.viewModel.selectedState();

		let data: FeatureCollection|Feature;

		if(this._marketsFillLayer)
		{
			this._map.removeSource('markets');

			this._map.removeLayer('markets-fill');
			//this._map.removeLayer('markets-outline');

		}

		if(selectedState !== null)
		{
			if(this._stateModel.hasItem(selectedState.statePostalCode))
			{
				const state = this._stateModel.getItemById(selectedState.statePostalCode);

				// Decide what polygons should be visible
				data = <Feature>this._marketFeatureCollection[selectedState.marketId];

				if(data)
				{
					// Zoom to the correct position
					this.resetMapZoom(state.coordinates.lat, state.coordinates.lng);
				}
				else
				{
					console.warn('State does not exist in the original-markets.json file');

					// Use all blocks in case it breaks
					data = <FeatureCollection>this._featureCollection;
				}
			}
			else
			{
				console.warn('Unknown state postal code: ', selectedState);
			}
		}
		else
		{
			data = <FeatureCollection>this._featureCollection;
		}

		// Add the source to the map
		this._map.addSource('markets', {
			"type": "geojson",
			"data": data
		});

		// Create a  layer
		this._marketsFillLayer = this._map.addLayer({
			id: 'markets-fill',
			type: 'fill',
			source: 'markets',
			paint: {
				// 'fill-pattern': 'stripe-pattern-2'
				'fill-color': '#009bdb',
				'fill-opacity': 0.3
			}
		});

		// this._marketsOutlineLayer = this._map.addLayer({
		// 	id: 'markets-outline',
		// 	type: 'line',
		// 	source: 'markets',
		// 	paint: {
		// 		'line-width': 2,
		// 		'line-color': '#009bdb'
		// 	}
		// });
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockMarketMapTransitionController(this.element, this);

		this._map = new mapboxgl.Map({
			container: 'js-map',
			center: [-97.0364, 38.8951],
			zoom: 4,
			minZoom: 4,
			scrollZoom: false,
			style: 'mapbox://styles/larsvanbraam/ciyodzuy800ds2sla6tuazga1'
		});

		this._map.on('load', this.handleMapLoad.bind(this));

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method handleMapLoad
	 */
	private handleMapLoad(): void
	{
		// data: 'https://spectrumreach.com/markets/markets-json'
		this.loadJSON('data/mapbox/market-details.json')
			.then((data: Array<IMarketDetail>) => this.viewModel.stateList(data))
			.then(this.updateScrollBar.bind(this))
			.then(this.loadJSON.bind(this, 'data/mapbox/original-markets.json'))
			.then((data: FeatureCollection) =>
			{
				// Parse it to multi-polygon to make it work... dafuq
				data.features.forEach((feature) =>
				{
					feature.geometry.type = 'MultiPolygon';
					feature.geometry.coordinates = feature.geometry.coordinates.map((coordinate) => [coordinate]);

					// Save for faster lookup
					this._marketFeatureCollection[feature.properties.id] = feature
				});

				// Store it
				this._featureCollection = data;
			})
			.then(this.updateDataLayer.bind(this))
			.then(this.addMapEvents.bind(this));
	}


	/**
	 * @private
	 * @method addMapEvents
	 */
	private addMapEvents(): void
	{
		this._map.on('click', this.handleMapClick.bind(this));
		this._map.on('mousemove', this.handleMapMouseMove.bind(this));
	}

	/**
	 * @private
	 * @method handleMapMouseMove
	 */
	private handleMapMouseMove(event: mapboxgl.EventData): void
	{
		let features = this._map.queryRenderedFeatures(event.point, {layers: ['markets-fill']});
		this._map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
	}

	/**
	 * @private
	 * @method handleMapClick
	 */
	private handleMapClick(event: mapboxgl.EventData): void
	{
		let features = this._map.queryRenderedFeatures(event.point, {layers: ['markets-fill']});

		if(!features.length)
		{
			return;
		}

		this.openContactPanel();

		// Phase 2 needs something like a popup
		// let feature = features[0];
		// let popup = new mapboxgl.Popup()
		// 	.setLngLat(this._map.unproject(event.point))
		// 	.setHTML(feature.properties.state)
		// 	.addTo(this._map);
	}

	/**
	 * @private
	 * @method resetMapZoom
	 * @param lat
	 * @param lng
	 * @param duration
	 */
	private resetMapZoom(lat: number = -97.0364, lng: number = 38.8951, duration: number = 1000): void
	{
		this._map.panTo(new mapboxgl.LngLat(lat, lng), {duration: duration});

		// Zoom + pan at the same time causes issues
		setTimeout(() => this._map.zoomTo(6), duration);
	}

	/**
	 * @private
	 * @method loadJSON
	 * @param path
	 * @returns {PromiseBluebird}
	 */
	private loadJSON(path: string): Promise<any>
	{
		return new Promise((resolve: (data: any) => void) =>
		{
			let loadJSONTask = new LoadJSONTask(path, (data) =>
			{
				resolve(data);

				loadJSONTask.destruct();
			});

			// Start loading
			loadJSONTask.execute();
		})
	}

	/**
	 * @private
	 * @method updateScrollBar
	 */
	private updateScrollBar(): void
	{
		const scrollElement = <HTMLElement>this.element.querySelector('.js-scroll-wrapper');

		// Update the scroll bar
		ko.utils.domData.get(scrollElement, Scrollbar.BINDING_NAME).update();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockMarketMapController;
