import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import CarouselEvent from '../../util/carousel/event/CarouselEvent';
import InfiniteImageCarousel from '../../util/carousel/InfiniteCarousel';
import NativeEventListener from '../../util/event/NativeEventListener';
import AudienceTopProgrammingData from './AudienceTopProgrammingData';
import AudienceTopProgrammingTransitionController from './AudienceTopProgrammingTransitionController';
import AudienceTopProgrammingSlide from './AudienceTopProgrammingSlide/AudienceTopProgrammingSlide';
import DashedPaginator from '../../component/DashedPaginator/DashedPaginator';

export default {
	name: 'AudienceTopProgramming',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(AudienceTopProgrammingData).isRequired,
	},
	components: {
		AudienceTopProgrammingSlide,
		DashedPaginator,
	},
	data() {
		return {
			activeIndex: 0,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceTopProgrammingTransitionController(this);
			this.carousel = new InfiniteImageCarousel(
				{
					sliderWrapper: this.$refs.slides,
					slides: this.$refs.slide,
				},
			);
			this.carouselEventListener = new NativeEventListener(this.carousel, CarouselEvent.CHANGE, event => {
				this.activeIndex = event.data.index;
			});
			this.isReady();
		},
		handlePrevious() {
			this.carousel.previous();
		},
		handleNext() {
			this.carousel.next();
		},
		handlePaginatorClick(index) {
			this.carousel.open(index);
		},
	},
};
