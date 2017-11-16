import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import { VideoOverlayMutationTypes } from '../../../store/module/videoOverlay';
import FindYourAudienceTeaserData from './FindYourAudienceTeaserData';
import FindYourAudienceTeaserTransitionController from './FindYourAudienceTeaserTransitionController';

export default {
	name: 'FindYourAudienceTeaser',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(FindYourAudienceTeaserData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new FindYourAudienceTeaserTransitionController(this);
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
