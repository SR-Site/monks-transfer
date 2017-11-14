import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import { VideoOverlayMutationTypes } from '../../../store/module/videoOverlay';
import MultipleImagesMediaData from './MultipleImagesMediaData';
import MultipleImagesMediaTransitionController from './MultipleImagesMediaTransitionController';

export default {
	name: 'MultipleImagesMedia',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(MultipleImagesMediaData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MultipleImagesMediaTransitionController(this);
			this.isReady();
		},
		handleVideoClick() {
			this.$store.dispatch(VideoOverlayMutationTypes.SHOW, {
				video: this.data.video,
				title: this.data.heading,
				poster: this.data.image,
			});
		},
	},
};
