import { AbstractButtonComponent } from 'vue-block-system';
import ButtonStartAdvertisingTransitionController from './ButtonStartAdvertisingTransitionController';

export default {
	name: 'ButtonStartAdvertising',
	extends: AbstractButtonComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonStartAdvertisingTransitionController(this);
			this.isReady();
		},
	},
};
