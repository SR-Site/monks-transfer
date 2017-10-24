import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import SuccessStoryHighlightTransitionController from './SuccessStoryHighlightTransitionController';
import SuccessStoryHighlightData from './SuccessStoryHighlightData';

export default {
	name: 'SuccessStoryHighlight',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(SuccessStoryHighlightData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SuccessStoryHighlightTransitionController(this);
			this.isReady();
		},
	},
};
