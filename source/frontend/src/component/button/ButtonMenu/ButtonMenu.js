import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ButtonMenuTransitionController from './ButtonMenuTransitionController';

export default {
	name: 'ButtonMenu',
	extends: AbstractButtonComponent,
	props: {
		isActive: VueTypes.bool.isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonMenuTransitionController(this);
			this.isReady();
		},
	},
};
