import { AbstractButtonComponent } from 'vue-block-system';
import ButtonCircleIconTransitionController from './ButtonCircleIconTransitionController';

export default {
	name: 'ButtonCircleIcon',
	extends: AbstractButtonComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCircleIconTransitionController(this);
			this.isReady();
		},
	},
};
