import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import StoryInfoImagesTransitionController from './StoryInfoImagesTransitionController';
import StoryInfoImagesData from './StoryInfoImagesData';

export default {
	name: 'StoryInfoImages',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(StoryInfoImagesData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new StoryInfoImagesTransitionController(this);
			this.isReady();
		},
	},
};
