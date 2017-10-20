import { AbstractButtonComponent } from 'vue-block-system';
import ButtonMenuTransitionController from './ButtonMenuTransitionController';

export default {
	name: 'ButtonMenu',
	extends: AbstractButtonComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonMenuTransitionController(this);
			this.isReady();
		},
	},
};
