import { AbstractButtonComponent } from 'vue-block-system';
import ButtonSecondaryTransitionController from './ButtonSecondaryTransitionController';
import VueTypes from 'vue-types';

export default {
	name: 'ButtonSecondary',
	extends: AbstractButtonComponent,
	props: {
		theme: VueTypes.string,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonSecondaryTransitionController(this);
			this.isReady();
		},
	},
};
