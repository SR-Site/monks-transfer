import { AbstractButtonComponent } from 'vue-block-system';
import ButtonPrimaryTransitionController from './ButtonPrimaryTransitionController';

export default {
	name: 'ButtonPrimary',
	extends: AbstractButtonComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonPrimaryTransitionController(this);
			this.isReady();
		},
	},
};
