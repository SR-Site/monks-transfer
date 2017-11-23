import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import ImageListSlideData from './ImageListSlideData';
import ImageListSlideTransitionController from './ImageListSlideTransitionController';

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
