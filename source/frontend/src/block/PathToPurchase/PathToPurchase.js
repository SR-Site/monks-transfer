import { DeviceStateEvent } from 'seng-device-state-tracker';
import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import { padStart, truncate } from 'lodash';
import PathToPurchaseTransitionController from './PathToPurchaseTransitionController';
import PathToPurchaseData from './PathToPurchaseData';
import NativeEventListener from '../../util/event/NativeEventListener';
import InfiniteCarousel from '../../util/carousel/InfiniteCarousel';
import CarouselEvent from '../../util/carousel/event/CarouselEvent';

export default {
	name: 'PathToPurchase',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(PathToPurchaseData).isRequired,
	},
	data() {
		return {
			activeIndex: 0,
			deviceState: this.$deviceState.currentState,
			previousDeviceState: null,
			enableInteraction: true,
		};
	},
	watch: {
		deviceState(state) {
			this.handleDeviceStateChange(state);
		},
	},
	computed: {
		isSmall() {
			return this.deviceState <= this.DeviceState.MEDIUM;
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PathToPurchaseTransitionController(this);
			this.deviceStateListener = new NativeEventListener(this.$deviceState, DeviceStateEvent.STATE_UPDATE, event => {
				this.deviceState = event.data.state;
			});
			this.isReady();
			this.createCarousel();
			this.handleDeviceStateChange(this.deviceState);
		},
		handleDeviceStateChange(state) {
			if (state <= this.DeviceState.MEDIUM) {
				this.carousel.reinit();
			} else {
				this.carousel.deactivate();
			}
		},
		createCarousel() {
			this.carousel = new InfiniteCarousel({
				sliderWrapper: this.$refs.slides,
				slides: this.$refs.slide,
			});

			this.carouselEventListener = new NativeEventListener(this.carousel, CarouselEvent.CHANGE, event => {
				this.activeIndex = event.data.index;
			});
		},
		padStart(value) {
			return padStart(value.toString(), 2, '0');
		},
		truncate(value, length) {
			return truncate(value, {
				length,
				separator: ' ',
			});
		},
		handleStepClick(index) {
			this.activeIndex = index;
		},
		handleMobilePaginatorClick(index) {
			if (this.carousel) {
				this.carousel.open(index);
			}
		},
	},
	beforeDestroy() {
		this.deviceStateListener.dispose();
		this.deviceStateListener = null;

		this.carouselEventListener.dispose();
		this.carouselEventListener = null;

		this.carousel.dispose();
		this.carousel = null;
	},
};
