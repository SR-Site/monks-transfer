import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import VideoWithContentBTransitionController from './VideoWithContentBTransitionController';
import VideoWithContentBData from './VideoWithContentBData';

export default {
	name: 'VideoWithContentB',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(VideoWithContentBData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new VideoWithContentBTransitionController(this);
			this.isReady();
		},
	},
};
