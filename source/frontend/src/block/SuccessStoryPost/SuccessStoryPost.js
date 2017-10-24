import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import SuccessStoryPostTransitionController from './SuccessStoryPostTransitionController';
import SuccessStoryPostData from './SuccessStoryPostData';

export default {
	name: 'SuccessStoryPost',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(SuccessStoryPostData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SuccessStoryPostTransitionController(this);
			this.isReady();
		},
	},
};
