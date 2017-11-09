import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ImageWithContentBTransitionController from './ImageWithContentBTransitionController';
import ImageWithContentBData from './ImageWithContentBData';

export default {
	name: 'ImageWithContentB',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ImageWithContentBData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ImageWithContentBTransitionController(this);
			this.isReady();
		},
	},
};
