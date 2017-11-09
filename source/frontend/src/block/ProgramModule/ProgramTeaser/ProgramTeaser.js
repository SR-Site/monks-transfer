import { truncate } from 'lodash';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import { VideoOverlayMutationTypes } from '../../../store/module/videoOverlay';
import ProgramTeaserData from './ProgramTeaserData';
import ProgramTeaserTransitionController from './ProgramTeaserTransitionController';

export default {
	name: 'ProgramTeaser',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(ProgramTeaserData),
	},
	computed: {
		truncatedParagraph() {
			return truncate(this.data.paragraph, {
				length: 150,
				separator: ' ',
			});
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ProgramTeaserTransitionController(this);
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
