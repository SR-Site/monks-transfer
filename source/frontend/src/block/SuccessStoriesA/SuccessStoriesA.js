import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import SuccessStoriesATransitionController from './SuccessStoriesATransitionController';
import SuccessStoriesAData from './SuccessStoriesAData';

export default {
	name: 'SuccessStoriesA',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(SuccessStoriesAData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SuccessStoriesATransitionController(this);
			this.isReady();
		},
	},
};
