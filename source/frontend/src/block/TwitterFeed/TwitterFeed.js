import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import CarouselEvent from '../../util/carousel/event/CarouselEvent';
import InfiniteImageCarousel from '../../util/carousel/InfiniteCarousel';
import NativeEventListener from '../../util/event/NativeEventListener';
import TwitterFeedData from './TwitterFeedData';
import TwitterFeedTransitionController from './TwitterFeedTransitionController';

export default {
	name: 'TwitterFeed',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(TwitterFeedData).isRequired,
	},
	data() {
		return {
			activeIndex: 0,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new TwitterFeedTransitionController(this);
			this.carousel = new InfiniteImageCarousel({
				sliderWrapper: this.$refs.slides,
				slides: this.$refs.slide,
			});
			this.carouselEventListener = new NativeEventListener(this.carousel, CarouselEvent.CHANGE, event => {
				this.activeIndex = event.data.index;
			});
			this.isReady();
		},
		handlePaginationClick(index) {
			this.carousel.open(index);
		},
		handlePrevious() {
			this.carousel.previous();
		},
		handleNext() {
			this.carousel.next();
		},
	},
};
