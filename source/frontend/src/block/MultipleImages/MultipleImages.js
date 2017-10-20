import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import MultipleImagesTransitionController from './MultipleImagesTransitionController';
import MultipleImagesData from './MultipleImagesData';

export default {
	name: 'MultipleImages',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(MultipleImagesData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MultipleImagesTransitionController(this);
			this.isReady();
		},
	},
};
