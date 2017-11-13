import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import MainProductNavTransitionController from './MainProductNavTransitionController';
import MainProductNavData from './MainProductNavData';

export default {
	name: 'MainProductNav',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(MainProductNavData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MainProductNavTransitionController(this);
			this.isReady();
		},
	},
};
