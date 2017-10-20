import { AbstractButtonComponent } from 'vue-block-system';
import ButtonTagTransitionController from './ButtonTagTransitionController';

export default {
	name: 'ButtonTag',
	extends: AbstractButtonComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonTagTransitionController(this);
			this.isReady();
		},
	},
};
