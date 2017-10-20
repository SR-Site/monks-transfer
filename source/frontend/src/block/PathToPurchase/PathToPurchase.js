import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import PathToPurchaseTransitionController from './PathToPurchaseTransitionController';
import PathToPurchaseData from './PathToPurchaseData';

export default {
	name: 'PathToPurchase',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(PathToPurchaseData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PathToPurchaseTransitionController(this);
			this.isReady();
		},
	},
};
