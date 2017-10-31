import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import FindContactBTransitionController from './FindContactBTransitionController';
import FindContactBData from './FindContactBData';

export default {
	name: 'FindContactB',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(FindContactBData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new FindContactBTransitionController(this);
			this.isReady();
		},
	},
};
