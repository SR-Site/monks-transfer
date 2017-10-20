import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ImageCarouselTransitionController from './ImageCarouselTransitionController';
import ImageCarouselData from './ImageCarouselData';

export default {
	name: 'ImageCarousel',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ImageCarouselData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ImageCarouselTransitionController(this);
			this.isReady();
		},
	},
};
