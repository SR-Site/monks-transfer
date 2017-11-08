import { AbstractButtonComponent } from 'vue-block-system';
import ButtonMenuTransitionController from './ButtonMenuTransitionController';
import VueTypes from 'vue-types';

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
