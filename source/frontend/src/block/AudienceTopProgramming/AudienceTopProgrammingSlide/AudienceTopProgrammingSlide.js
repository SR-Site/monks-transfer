import { truncate } from 'lodash';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import { VideoOverlayMutationTypes } from '../../../store/module/videoOverlay';
import AudienceTopProgrammingSlideData from './AudienceTopProgrammingSlideData';
import AudienceTopProgrammingSlideTransitionController from './AudienceTopProgrammingSlideTransitionController';

export default {
	name: 'AudienceTopProgrammingSlide',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(AudienceTopProgrammingSlideData).isRequired,
	},
	computed: {
		truncatedParagraph() {
			return truncate(this.data.paragraph, {
				length: 120,
				separator: ' ',
			});
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceTopProgrammingSlideTransitionController(this);
			this.isReady();
		},
		handleVideoClick() {
			this.$store.dispatch(VideoOverlayMutationTypes.SHOW, {
				video: this.data.video,
				title: this.data.heading,
				poster: this.data.background,
			});
		},
	},
};
