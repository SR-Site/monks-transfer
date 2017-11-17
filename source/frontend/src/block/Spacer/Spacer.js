import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import SpacerTransitionController from './SpacerTransitionController';
import SpacerData from './SpacerData';

export default {
	name: 'Spacer',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(SpacerData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SpacerTransitionController(this);
			this.isReady();
		},
	},
};
