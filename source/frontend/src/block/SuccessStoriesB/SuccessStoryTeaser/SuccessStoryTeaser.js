import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import SuccessStoryTeaserData from './SuccessStoryTeaserData';
import SuccessStoryTeaserTransitionController from './SuccessStoryTeaserTransitionController';

export default {
	name: 'SuccessStoryTeaser',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(SuccessStoryTeaserData).isRequired,
	},
	data() {
		return {
			isHover: false,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SuccessStoryTeaserTransitionController(this);
			this.isReady();
		},
		handleMouseEnter() {
			this.isHover = true;
		},
		handleMouseLeave() {
			this.isHover = false;
		},
	},
};
