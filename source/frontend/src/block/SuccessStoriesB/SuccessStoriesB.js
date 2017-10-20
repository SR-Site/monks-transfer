import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import SuccessStoriesBTransitionController from './SuccessStoriesBTransitionController';
import SuccessStoriesBData from './SuccessStoriesBData';

export default {
	name: 'SuccessStoriesB',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(SuccessStoriesBData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SuccessStoriesBTransitionController(this);
			this.isReady();
		},
	},
};
