import VueTypes from 'vue-types';
import bowser from 'bowser';
import { AbstractBlockComponent } from 'vue-block-system';
import VideoWithContentTransitionController from './VideoWithContentTransitionController';
import VideoWithContentData from './VideoWithContentData';
import { VideoOverlayMutationTypes } from '../../store/module/videoOverlay';

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
		handleVideoClick() {
			this.$store.dispatch(VideoOverlayMutationTypes.SHOW, {
				video: this.data.video,
				title: this.data.heading,
				poster: this.data.poster,
				controls: bowser.mobile || bowser.tablet,
			});
		},
	},
};
