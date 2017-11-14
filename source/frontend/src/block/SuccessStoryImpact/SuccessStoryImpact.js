import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import SuccessStoryImpactTransitionController from './SuccessStoryImpactTransitionController';
import SuccessStoryImpactData from './SuccessStoryImpactData';

export default {
	name: 'SuccessStoryImpact',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(SuccessStoryImpactData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SuccessStoryImpactTransitionController(this);
			this.isReady();
		},
	},
};
