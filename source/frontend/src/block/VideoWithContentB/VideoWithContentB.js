import VueTypes from 'vue-types';
import bowser from 'bowser';
import { AbstractBlockComponent } from 'vue-block-system';
import VideoWithContentBTransitionController from './VideoWithContentBTransitionController';
import VideoWithContentBData from './VideoWithContentBData';
import { VideoOverlayMutationTypes } from '../../store/module/videoOverlay';

export default {
	name: 'VideoWithContentB',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(VideoWithContentBData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new VideoWithContentBTransitionController(this);
			console.log(this.Theme.DARK);
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
