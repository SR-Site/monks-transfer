import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import MainProductNavItemData from './MainProductNavItemData';
import MainProductNavItemTransitionController from './MainProductNavItemTransitionController';

export default {
	name: 'MainProductNavItem',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(MainProductNavItemData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MainProductNavItemTransitionController(this);
			this.isReady();
		},
	},
};
