import markets from 'asset/json/markets.json';
import states from 'asset/json/states.json';
import bows from 'bows';
import isString from 'lodash/isString';
import mapboxgl from 'mapbox-gl';
import { AbstractBlockComponent, CustomButtonEvent, customButtonEventDispatcher } from 'vue-block-system';
import VueTypes from 'vue-types';
import LoadJsonTask from '../../util/preloading/task/LoadJsonTask';
import MarketList from './MarketList/MarketList';
import MarketMapData from './MarketMapData';
import MarketMapTransitionController from './MarketMapTransitionController';
import MarketSearch from './MarketSearch/MarketSearch';
import ServiceButton from './ServiceButton/ServiceButton';
import ZoomActions from './ZoomActions/ZoomActions';

export default {
	name: 'MarketMap',
	extends: AbstractBlockComponent,
	components: {
		MarketList,
		MarketSearch,
		ZoomActions,
		ServiceButton,
	},
	props: {
		data: VueTypes.shape(MarketMapData).isRequired,
	},
	created() {
		// eslint-disable-next-line
		this.log = new bows('MarketMap');
		this.featureCollection = {};
		this.marketFeatureCollection = {};
		this.config = {
			detailZoomLevel: 6,
			defaultZoomLevel: 4,
			defaultZoomDuration: 1000,
			center: {
				lat: -97.0364,
				lng: 38.8951,
			},
		};
		this.marketsFillLayer = null;
	},
	computed: {
		selectValueLabel() {
			const market = this.selectedMarket;
			return market ? `${market.city}, ${market.statePostalCode}` : this.$t('global.form.select.city');
		},
	},
	data() {
		return {
			states,
			markets,
			selectedMarket: null,
			mobileSidePanelOpen: false,
			allowMarketSelecting: true,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketMapTransitionController(this);
			this.getChild('Spinner')
				.transitionIn()
				.then(() => this.createMap());
			this.isReady();
		},
		createMap() {
			// Set the access token
			mapboxgl.accessToken = this.$config.getProperty(this.PropertyNames.MAPBOX_ACCESS_TOKEN);
			// Create the map
			this.map = new mapboxgl.Map({
				container: 'js-map',
				center: [this.config.center.lat, this.config.center.lng],
				zoom: 4,
				minZoom: 4,
				scrollZoom: false,
				dragPan: true, // Lars: Do we want to disable this on mobile? It blocks
				// native page scrolling.
				style: this.$config.getProperty(this.PropertyNames.MAPBOX_MAP_STYLE),
			});
			this.map.on('load', this.handleMapLoaded);
		},
		loadMapPolygons() {
			return this.$taskLoader.loadTasks([
				new LoadJsonTask({
					assets: `${this.$versionRoot}data/mapbox/markets-polygon.json`,
					cached: false,
					onAssetLoaded: result => {
						result.asset.features.forEach(feature => {
							const featureId = feature.properties.id;

							// Save in feature collections for
							// faster lookup
							if (!this.marketFeatureCollection[featureId]) {
								this.marketFeatureCollection[featureId] = {
									type: 'FeatureCollection',
									features: [],
								};
							}

							this.marketFeatureCollection[featureId].features.push(feature);
						});

						// Store it
						this.featureCollection = result.asset;
					},
				}),
			]);
		},
		resetMarket() {
			this.selectedMarket = null;
			this.updateDataLayer();
			this.moveToCoordinates(
				this.config.center.lat,
				this.config.center.lng,
				this.config.defaultZoomLevel,
				this.config.defaultZoomDuration,
			);
		},
		moveToCoordinates(lat, lng, zoom, duration) {
			return new Promise(resolve => {
				this.map.once('moveend', resolve);
				this.map.flyTo({
					center: new mapboxgl.LngLat(lat, lng),
					zoom,
					duration,
				});
			});
		},
		handleMapClick(event) {
			const features = this.map.queryRenderedFeatures(event.point, { layers: ['markets-fill'] });

			if (!features.length) {
				return;
			}

			// Check if we have zoomed in enough to open the contact panel
			if (this.map.getZoom() >= this.config.detailZoomLevel) {
				let { id } = features[0].properties;
				id = !isString(id) ? id.toString() : id;

				this.$tracking.trackEvent({
					[this.TrackingProvider.GOOGLE_ANALYTICS]: {
						category: 'startAdvertising',
						action: 'click',
						label: id,
					},
				});

				this.handleContactUs();
			} else {
				const marketId = features[0].properties.id;
				const market = this.markets.find(data => data.marketId === marketId.toString());

				if (market) {
					this.handleSelectMarket(market);
				}
			}

			// Phase 2 needs something like a popup
			// let feature = features[0];
			// let popup = new mapboxgl.Popup()
			// 	.setLngLat(this.map.unproject(event.point))
			// 	.setHTML(feature.properties.state)
			// 	.addTo(this.map);
		},
		removeDataLayer() {
			if (this.marketsFillLayer) {
				this.map.removeSource('markets');
				this.map.removeLayer('markets-fill');
			}
		},
		updateDataLayer() {
			let data = this.featureCollection;

			this.removeDataLayer();

			// Check if a market is selected
			if (this.selectedMarket !== null) {
				// Check if the selected market state exists
				const state = this.states.find(stateData => stateData.id === this.selectedMarket.statePostalCode);

				if (state) {
					// Get the feature collection for the selected market
					data = this.marketFeatureCollection[this.selectedMarket.marketId];

					if (data) {
						// Zoom to the correct position
						this.moveToCoordinates(
							state.coordinates.lat,
							state.coordinates.lng,
							this.config.detailZoomLevel,
							this.config.defaultZoomDuration,
						).then(() => {
							this.allowMarketSelecting = true;
						});
					} else {
						this.log(`State does not exist in the original-markets.json file`);
					}
				} else {
					this.log(`Unknown state postal code: ${this.selectedMarket}`);
				}
			} else {
				this.log(`No State selected so show all markets`);
			}

			// Add the source to the map
			this.map.addSource('markets', {
				data,
				type: 'geojson',
			});

			this.marketsFillLayer = this.map.addLayer({
				id: 'markets-fill',
				type: 'fill',
				source: 'markets',
				paint: {
					// 'fill-pattern': 'stripe-pattern-2'
					'fill-color': '#009bdb',
					'fill-opacity': 0.3,
				},
			});
		},
		handleSelectMarket(market) {
			if (this.allowMarketSelecting) {
				this.selectedMarket = market;
				this.updateDataLayer();
				this.mobileSidePanelOpen = false;
				this.allowMarketSelecting = false;
			}
		},
		handleMapMouseMove(event) {
			const features = this.map.queryRenderedFeatures(event.point, { layers: ['markets-fill'] });
			this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
		},
		handleMapLoaded() {
			this.loadMapPolygons()
				.then(() => this.updateDataLayer())
				.then(() => {
					this.map.on('click', this.handleMapClick.bind(this));
					this.map.on('mousemove', this.handleMapMouseMove.bind(this));
				})
				.then(() => this.getChild('Spinner').transitionOut())
				.catch(reason => console.error('failed', reason));
		},
		handleZoomIn() {
			this.map.zoomIn();
		},
		handleZoomOut() {
			this.map.zoomOut();
		},
		handleContactUs() {
			// Abuse the custom button event dispatcher from the block system to fake a button event and open the
			// contact us panel
			customButtonEventDispatcher.dispatchEvent(
				new CustomButtonEvent(CustomButtonEvent.FIRE, {
					event: this.BackendLinkType.CONTACT_US,
				}),
			);
		},
		handleToggleMobileSidePanel() {
			this.mobileSidePanelOpen = !this.mobileSidePanelOpen;
		},
	},
};
