import { AbstractButtonComponent } from 'vue-block-system';
import ButtonCirclePlayTransitionController from './ButtonCirclePlayTransitionController';

export default {
	name: 'ButtonCirclePlay',
	extends: AbstractButtonComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCirclePlayTransitionController(this);
			this.isReady();
		},
	},
};
