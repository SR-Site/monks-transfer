import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import FindContactTransitionController from './FindContactTransitionController';
import FindContactData from './FindContactData';

export default {
	name: 'FindContact',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(FindContactData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new FindContactTransitionController(this);
			this.isReady();
		},
	},
};
