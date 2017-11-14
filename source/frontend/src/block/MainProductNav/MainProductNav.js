import { DeviceStateEvent } from 'seng-device-state-tracker';
import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import CarouselEvent from '../../util/carousel/event/CarouselEvent';
import InfiniteImageCarousel from '../../util/carousel/InfiniteCarousel';
import NativeEventListener from '../../util/event/NativeEventListener';
import MainProductNavData from './MainProductNavData';
import MainProductNavItem from './MainProductNavItem/MainProductNavItem';
import MainProductNavTransitionController from './MainProductNavTransitionController';

export default {
	name: 'MainProductNav',
	extends: AbstractBlockComponent,
	components: {
		MainProductNavItem,
	},
	props: {
		data: VueTypes.shape(MainProductNavData).isRequired,
	},
	data() {
		return {
			activeIndex: 0,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MainProductNavTransitionController(this);
			this.deviceStateListener = new NativeEventListener(
				this.$deviceState,
				DeviceStateEvent.STATE_UPDATE,
				event => this.handleDeviceStateChange(event.data.state),
			);
			this.handleDeviceStateChange(this.$deviceState.currentState);
			this.isReady();
		},
		handleDeviceStateChange(newState) {
			this.$nextTick(() => {
				if (newState <= this.DeviceState.SMALL) {
					this.createCarousel();
				} else {
					this.disposeCarousel();
				}
			});
		},
		disposeCarousel() {
			if (this.carousel && this.carouselEventListener) {
				this.carouselEventListener.dispose();
				this.carouselEventListener = null;
				this.carousel.dispose();
				this.carousel = null;
			}
		},
		createCarousel() {
			if (!this.carousel) {
				this.carousel = new InfiniteImageCarousel(
					{
						sliderWrapper: this.$refs.slides,
						slides: this.$refs.item,
					},
				);
				this.carouselEventListener = new NativeEventListener(this.carousel, CarouselEvent.CHANGE, event => {
					this.activeIndex = event.data.index;
				});
			}
		},
		handlePaginatorClick(index) {
			this.carousel.open(index);
		},
	},
	beforeDestroy() {
		this.disposeCarousel();
	},
};
