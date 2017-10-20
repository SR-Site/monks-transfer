import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import HowToAdvertiseTransitionController from './HowToAdvertiseTransitionController';
import HowToAdvertiseData from './HowToAdvertiseData';

export default {
	name: 'HowToAdvertise',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(HowToAdvertiseData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new HowToAdvertiseTransitionController(this);
			this.isReady();
		},
	},
};
