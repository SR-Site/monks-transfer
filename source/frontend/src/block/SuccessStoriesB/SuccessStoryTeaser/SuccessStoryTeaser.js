import { AbstractTransitionComponent } from 'vue-transition-component';
import SuccessStoryTeaserData from './SuccessStoryTeaserData';
import SuccessStoryTeaserTransitionController from './SuccessStoryTeaserTransitionController';
import VueTypes from 'vue-types';

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
