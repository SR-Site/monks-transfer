import { AbstractButtonComponent } from 'vue-block-system';
import ButtonCircleCloseTransitionController from './ButtonCircleCloseTransitionController';

export default {
	name: 'ButtonCircleClose',
	extends: AbstractButtonComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCircleCloseTransitionController(this);
			this.isReady();
		},
	},
};
