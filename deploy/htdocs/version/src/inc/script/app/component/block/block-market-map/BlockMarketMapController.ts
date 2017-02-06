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
import IState from "./interface/IState";

class BlockMarketMapController extends AbstractBlockComponentController<BlockMarketMapViewModel, IBlockMarketMapOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockMarketMap');

	private _map: mapboxgl.Map;
	private _layers: {
		[id: string]: {
			source?: any;
			outline?: mapboxgl.Map;
			fill?: mapboxgl.Map;
		}
	} = {};

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

		this._map = new mapboxgl.Map({
			container: 'js-map',
			center: [-73.996052, 41.265085],
			zoom: 8,
			scrollZoom: true,
			style: 'mapbox://styles/larsvanbraam/ciyodzuy800ds2sla6tuazga1'
		});

		this._map.on('load', this.handleMapLoad.bind(this));
	}

	/**
	 * @private
	 * @method handleMapLoad
	 */
	private handleMapLoad(): void
	{
		this.loadStates()
			.then((states: Array<IState>) => this.viewModel.stateList(states))
			.then(() => this.loadFeatures())
			.then((data: FeatureCollection) => this.addDataLayer(data))
			.then(() => this.addMapEvents());
	}

	/**
	 * @private
	 * @method addDataLayer
	 * @param data
	 */
	private addDataLayer(data: FeatureCollection): void
	{
		// Parse it to multi-polygon to make it work... dafuq
		data.features.forEach((feature, index) =>
		{
			if(feature.properties.id !== void 0)
			{
				if(this._layers[feature.properties.id] === void 0)
				{
					feature.geometry.type = 'MultiPolygon';
					feature.geometry.coordinates = feature.geometry.coordinates.map((coordinate) => [coordinate]);

					// Create the source for the map
					this._layers[feature.properties.id] = {};

					// Draw the layer for the outline
					this._layers[feature.properties.id].outline = this._map.addLayer({
						id: 'markets-outline-' + feature.properties.id,
						type: 'line',
						source: {
							"type": "geojson",
							"data": feature
						},
						paint: {
							'line-width': 2,
							'line-color': '#009bdb'
						}
					});

					// Draw the layer for the fill
					this._layers[feature.properties.id].fill = this._map.addLayer({
						id: 'markets-fill-' + feature.properties.id,
						type: 'fill',
						source: {
							"type": "geojson",
							"data": feature
						},
						paint: {
							// 'fill-pattern': 'stripe-pattern-2'
							'fill-color': '#009bdb',
							'fill-opacity': 0.3
						}
					})
				}
				else
				{
					console.warn('duplicate feature id', feature.properties.id);
				}
			}
			else
			{
				console.warn('Unknown feature Id', feature)
			}
		});

		console.log(this._layers);
	}

	/**
	 * @private
	 * @method addMapEvents
	 */
	private addMapEvents(): void
	{
		const layers = Object.keys(this._layers).map((key: string) => 'markets-fill-' + key);

		// When a click event occurs near a polygon, open a popup at the location of
		// the feature, with description HTML from its properties.
		this._map.on('click', (e) =>
		{
			let features = this._map.queryRenderedFeatures(e.point, {layers: layers});

			if(!features.length)
			{
				return;
			}

			let feature = features[0];

			let popup = new mapboxgl.Popup()
				.setLngLat(this._map.unproject(e.point))
				.setHTML(feature.properties.state)
				.addTo(this._map);
		});

		this._map.on('mousemove', (e) =>
		{
			let features = this._map.queryRenderedFeatures(e.point, {layers: layers});
			this._map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
		});
	}


	/**
	 * @private
	 * @method loadFeatures
	 * @returns Promise<Array<IFeatures>>
	 */
	private loadFeatures(): Promise<FeatureCollection>
	{
		return new Promise((resolve: (data: FeatureCollection) => void) =>
		{
			// type: 'geojson',
			// data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'
			// data: 'https://spectrumreach.com/markets/markets-json'

			// TODO: move to config? fetch from back-end?
			let loadJSONTask = new LoadJSONTask('data/mapbox/original-markets.json', (data) =>
			{
				resolve(data);

				loadJSONTask.destruct();
			});

			// Start loading
			loadJSONTask.execute();
		});
	}

	/**
	 * @private
	 * @method loadStates
	 * @returns {PromiseBluebird}
	 */
	private loadStates(): Promise<any>
	{
		return new Promise((resolve: (states: Array<IState>) => void) =>
		{
			let loadJSONTask = new LoadJSONTask('data/mapbox/market-details.json', (data) =>
			{
				resolve(data);

				loadJSONTask.destruct();
			});

			// Start loading
			loadJSONTask.execute();
		})
	}


	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockMarketMapTransitionController(this.element, this);

		super.allComponentsLoaded();
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

interface IFeature
{
	type: string;
	properties: {
		id: string;
		region: string;
		state: string;
		visible: string;
	}
	geometry: {
		type: string;
		coordinates: any;
	}
}

export default BlockMarketMapController;
