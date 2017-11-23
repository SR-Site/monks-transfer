import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import { VideoOverlayMutationTypes } from '../../store/module/videoOverlay';
import AudienceTeaserTransitionController from './AudienceTeaserTransitionController';
import AudienceTeaserData from './AudienceTeaserData';

export default {
	name: 'AudienceTeaser',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(AudienceTeaserData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceTeaserTransitionController(this);
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
