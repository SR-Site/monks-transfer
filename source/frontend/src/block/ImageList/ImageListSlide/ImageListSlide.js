import { AbstractTransitionComponent } from 'vue-transition-component';
import ImageListSlideTransitionController from './ImageListSlideTransitionController';
import ImageListSlideData from './ImageListSlideData';
import VueTypes from 'vue-types';

export default {
	name: 'ImageListSlide',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(ImageListSlideData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ImageListSlideTransitionController(this);
			this.isReady();
		},
	},
};
