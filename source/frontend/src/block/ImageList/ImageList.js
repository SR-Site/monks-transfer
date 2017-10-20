import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ImageListTransitionController from './ImageListTransitionController';
import ImageListData from './ImageListData';

export default {
	name: 'ImageList',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ImageListData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ImageListTransitionController(this);
			this.isReady();
		},
	},
};
