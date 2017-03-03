import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockMarketMapTransitionController from "app/component/block/block-market-map/BlockMarketMapTransitionController";
import IBlockMarketMapOptions from "app/component/block/block-market-map/IBlockMarketMapOptions";
import BlockMarketMapViewModel from "app/component/block/block-market-map/BlockMarketMapViewModel";
import Log from "lib/temple/util/Log";
import configManagerInstance from "../../../../lib/temple/config/configManagerInstance";
import {PropertyNames} from "../../../data/enum/ConfigNames";
import LoadJSONTask from "../../../../lib/temple/control/sequence/task/loader/LoadJSONTask";
import IMarketDetail from "./interface/IMarketDetail";
import Scrollbar from "../../../../lib/temple/component/Scrollbar";
import StateModel from "../../../data/model/StateModel";
import DataManager from "../../../data/DataManager";
import PanelBlocks from "../../../data/enum/block/PanelBlocks";
import Promise = require("bluebird");
import MarketSearchController from "../../market-search/MarketSearchController";
import DataEvent from "../../../../lib/temple/event/DataEvent";


class BlockMarketMapController extends AbstractBlockComponentController<BlockMarketMapViewModel, IBlockMarketMapOptions, BlockMarketMapTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockMarketMap');

	private _featureCollection: GeoJSON.FeatureCollection;
	private _marketFeatureCollection: {[id: string]: GeoJSON.FeatureCollection} = {};

	private _marketSearchController: MarketSearchController;

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
	 * @method handleMarketSearchReady
	 */
	public handleMarketSearchReady(controller: MarketSearchController): void
	{
		this._marketSearchController = controller;

		this._marketSearchController.addEventListener(MarketSearchController.RESET, this.resetMarket.bind(this));
		this._marketSearchController.addEventListener(MarketSearchController.SELECT,
			(event: DataEvent<IMarketDetail>) => this.selectMarket(event.data))
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
	public zoomIn(): void
	{
		this._map.zoomIn()
	}

	/**
	 * @public
	 * @method zoomOut
	 */
	public zoomOut(): void
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
		const selectedMarket = this.viewModel.selectedMarket();

		let data: GeoJSON.FeatureCollection;

		if(this._marketsFillLayer)
		{
			this._map.removeSource('markets');

			this._map.removeLayer('markets-fill');
			//this._map.removeLayer('markets-outline');

		}

		if(selectedMarket !== null)
		{
			if(this._stateModel.hasItem(selectedMarket.statePostalCode))
			{
				const state = this._stateModel.getItemById(selectedMarket.statePostalCode);

				// Decide what polygons should be visible
				data = <GeoJSON.FeatureCollection>this._marketFeatureCollection[selectedMarket.marketId];

				if(data)
				{
					// Zoom to the correct position
					this.resetMapZoom(state.coordinates.lat, state.coordinates.lng, 6);
				}
				else
				{
					console.warn('State does not exist in the original-markets.json file');

					// Use all blocks in case it breaks
					data = <GeoJSON.FeatureCollection>this._featureCollection;
				}
			}
			else
			{
				console.warn('Unknown state postal code: ', selectedMarket);
			}
		}
		else
		{
			data = <GeoJSON.FeatureCollection>this._featureCollection;
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
			style: configManagerInstance.getProperty(PropertyNames.MAPBOX_MAP_STYLE)
		});

		this._map.on('load', this.handleMapLoad.bind(this));

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method resetMarket
	 */
	private resetMarket(): void
	{
		this.viewModel.selectedMarket(null);

		this.updateDataLayer();
		this.resetMapZoom();
	}

	/**
	 * @public
	 * @method selectMarket
	 */
	public selectMarket(market: IMarketDetail): void
	{
		this.viewModel.selectedMarket(market);
		this._marketSearchController.setMarket(market);

		this.updateDataLayer();
	}

	/**
	 * @private
	 * @method handleMapLoad
	 */
	private handleMapLoad(): void
	{
		// data: 'https://spectrumreach.com/markets/markets-json'

		this.loadJSON('data/mapbox/markets.json')
			.then(this.handleMarketsLoaded.bind(this))
			.then(this.updateScrollBar.bind(this))
			.then(this.loadJSON.bind(this, 'data/mapbox/markets-polygon.json'))
			.then((data: GeoJSON.FeatureCollection) =>
			{
				data.features.forEach((feature) =>
				{
					const featureId = feature.properties.id;

					// Save in feature collections for faster lookup
					if(!this._marketFeatureCollection[featureId])
					{
						this._marketFeatureCollection[featureId] = {
							type: 'FeatureCollection',
							features: []
						};
					}

					this._marketFeatureCollection[featureId].features.push(feature);
				});

				// Store it
				this._featureCollection = data;
			})
			.then(this.updateDataLayer.bind(this))
			.then(this.addMapEvents.bind(this));
	}

	/**
	 * @private
	 * @method handleMarketsLoaded
	 */
	private handleMarketsLoaded(data: Array<IMarketDetail>): void
	{
		// Startup the autocomplete search
		this._marketSearchController.setupAutoComplete(data);

		// Udate the scrollbar on the right
		this.viewModel.marketList(data);
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
	 * @param zoomLevel
	 * @param duration
	 */
	private resetMapZoom(lat: number = -97.0364, lng: number = 38.8951, zoomLevel: number = 4, duration: number = 1000): void
	{
		this._map.panTo(new mapboxgl.LngLat(lat, lng), {duration: duration});

		// Zoom + pan at the same time causes issues
		setTimeout(() => this._map.zoomTo(zoomLevel), duration);
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
		if(this._map)
		{
			// This method also cleans up the layers according to the documentation!
			this._map.remove();
			this._map = null;
		}

		this._marketsOutlineLayer = null;
		this._marketsFillLayer = null;
		this._featureCollection = null;
		this._marketFeatureCollection = null;
		this._stateModel = null;

		// always call this last
		super.destruct();
	}
}

export default BlockMarketMapController;
