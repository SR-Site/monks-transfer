import { AbstractTransitionComponent } from 'vue-transition-component';
import PersonaSelectorMobileCarouselTransitionController from './PersonaSelectorMobileCarouselTransitionController';
import VueTypes from 'vue-types';
import InfiniteCarousel from '../../../util/carousel/InfiniteCarousel';
import CarouselEvent from '../../../util/carousel/event/CarouselEvent';
import NativeEventListener from '../../../util/event/NativeEventListener';

export default {
	name: 'PersonaSelectorMobileCarousel',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.any.isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PersonaSelectorMobileCarouselTransitionController(this);
			this.isReady();

			this.carousel = new InfiniteCarousel(
				{
					sliderWrapper: this.$refs.slides,
					slides: this.$refs.slide,
				},
			);
			this.carouselEventListener = new NativeEventListener(
				this.carousel,
				CarouselEvent.CHANGE,
				event => this.$emit('carouselChange', event.data.index),
			);
		},
		disableInteraction() {
			if (this.carousel) {
				this.carousel.disableInteraction();
			}
		},
		enableInteraction() {
			if (this.carousel) {
				this.carousel.enableInteraction();
			}
		},
	},
	beforeDestroy() {
		this.carousel.dispose();
		this.carousel = null;

		this.carouselEventListener.dispose();
		this.carouselEventListener = null;
	},
};
