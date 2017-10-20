import { AbstractButtonComponent } from 'vue-block-system';
import ButtonHeaderTransitionController from './ButtonHeaderTransitionController';

export default {
	name: 'ButtonHeader',
	extends: AbstractButtonComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonHeaderTransitionController(this);
			this.isReady();
		},
	},
};
