import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ImageCarouselTransitionController from './ImageCarouselTransitionController';
import ImageCarouselData from './ImageCarouselData';
import InfiniteCarousel from '../../util/carousel/InfiniteCarousel';
import NativeEventListener from '../../util/event/NativeEventListener';
import CarouselEvent from '../../util/carousel/event/CarouselEvent';
import { VideoOverlayMutationTypes } from '../../store/module/videoOverlay';

export default {
	name: 'ImageCarousel',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ImageCarouselData).isRequired,
	},
	data() {
		return {
			activeIndex: 0,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ImageCarouselTransitionController(this);
			this.isReady();
			this.carousel = new InfiniteCarousel({
				sliderWrapper: this.$refs.slides,
				slides: this.$refs.slide,
			});
			this.carouselEventListener = new NativeEventListener(this.carousel, CarouselEvent.CHANGE, event => {
				this.activeIndex = event.data.index;
			});
		},
		handleVideoClick(slide) {
			this.$store.dispatch(VideoOverlayMutationTypes.SHOW, {
				video: slide.video,
				title: slide.heading,
				poster: slide.image,
			});
		},
		handlePaginatorClick(index) {
			this.carousel.open(index);
		},
	},
	beforeDestroy() {
		this.carousel.dispose();
		this.carousel = null;
	},
};
