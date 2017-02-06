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

class BlockMarketMapController extends AbstractBlockComponentController<BlockMarketMapViewModel, IBlockMarketMapOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockMarketMap');

	private _map: mapboxgl.Map;
	private _layers: Array<Map> = [];

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
		this.loadFeatures()
			.then((data: FeatureCollection) => this.addDataLayer(data))
			.then(()=> this.addMapEvents());
	}

	/**
	 * @private
	 * @method addDataLayer
	 * @param data
	 */
	private addDataLayer(data:FeatureCollection): void
	{
			// Parse it to multi-polygon to make it work... dafuq
			data.features.forEach((feature) =>
			{
				feature.geometry.type = 'MultiPolygon';
				feature.geometry.coordinates = feature.geometry.coordinates.map((coordinate) => [coordinate]);
			});

			// Add the source to the map
			this._map.addSource('markets', {
				"type": "geojson",
				"data": data
			});

			// Create a  layer
			let fill = this._map.addLayer({
				id: 'markets-fill',
				type: 'fill',
				source: 'markets',
				paint: {
					// 'fill-pattern': 'stripe-pattern-2'
					'fill-color': '#009bdb',
					'fill-opacity': 0.3
				}
			});

			let outline = this._map.addLayer({
				id: 'markets-outline',
				type: 'line',
				source: 'markets',
				paint: {
					'line-width': 2,
					'line-color': '#009bdb'
				}
			});
	}

	/**
	 * @private
	 * @method addMapEvents
	 */
	private addMapEvents(): void
	{
		// When a click event occurs near a polygon, open a popup at the location of
		// the feature, with description HTML from its properties.
		this._map.on('click', function(e)
		{
			let features = this._map.queryRenderedFeatures(e.point, {layers: ['markets-fill']});

			if(!features.length)
			{
				return;
			}

			let feature = features[0];

			let popup = new mapboxgl.Popup()
				.setLngLat(this._map.unproject(e.point))
				.setHtml(feature.properties.name)
				.addTo(this._map);
		});

		this._map.on('mousemove', function(e)
		{
			let features = this._map.queryRenderedFeatures(e.point, {layers: ['markets-fill']});
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
