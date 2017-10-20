import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import VideoWithContentTransitionController from './VideoWithContentTransitionController';
import VideoWithContentData from './VideoWithContentData';

export default {
	name: 'VideoWithContent',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(VideoWithContentData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new VideoWithContentTransitionController(this);
			this.isReady();
		},
	},
};
