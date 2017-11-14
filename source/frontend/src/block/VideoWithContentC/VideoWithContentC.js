import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import VideoWithContentCTransitionController from './VideoWithContentCTransitionController';
import VideoWithContentCData from './VideoWithContentCData';
import { VideoOverlayMutationTypes } from '../../store/module/videoOverlay';

export default {
	name: 'VideoWithContentC',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(VideoWithContentCData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new VideoWithContentCTransitionController(this);
			this.isReady();
		},
		handleVideoClick() {
			this.$store.dispatch(VideoOverlayMutationTypes.SHOW, {
				video: this.data.video,
				title: this.data.heading,
				poster: this.data.poster,
			});
		}
	},
};
