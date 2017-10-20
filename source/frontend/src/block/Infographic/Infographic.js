import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import InfographicTransitionController from './InfographicTransitionController';
import InfographicData from './InfographicData';

export default {
	name: 'Infographic',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(InfographicData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new InfographicTransitionController(this);
			this.isReady();
		},
	},
};
