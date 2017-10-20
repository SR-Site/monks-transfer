import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ImageWithContentTransitionController from './ImageWithContentTransitionController';
import ImageWithContentData from './ImageWithContentData';

export default {
	name: 'ImageWithContent',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ImageWithContentData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ImageWithContentTransitionController(this);
			this.isReady();
		},
	},
};
