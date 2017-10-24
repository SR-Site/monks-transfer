import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ButtonTagTransitionController from './ButtonTagTransitionController';

export default {
	name: 'ButtonTag',
	extends: AbstractButtonComponent,
	props: {
		isInactive: VueTypes.string,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonTagTransitionController(this);
			this.isReady();
		},
	},
};
