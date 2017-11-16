import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import { VideoOverlayMutationTypes } from '../../store/module/videoOverlay';
import LargeVideoData from './LargeVideoData';
import LargeVideoTransitionController from './LargeVideoTransitionController';

export default {
	name: 'LargeVideo',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(LargeVideoData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new LargeVideoTransitionController(this);
			this.isReady();
		},
		handleVideoClick() {
			this.$store.dispatch(VideoOverlayMutationTypes.SHOW, {
				video: this.data.video,
				poster: this.data.poster,
			});
		},
	},
};
