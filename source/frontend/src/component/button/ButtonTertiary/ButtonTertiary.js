import { AbstractButtonComponent } from 'vue-block-system';
import ButtonTertiaryTransitionController from './ButtonTertiaryTransitionController';

export default {
	name: 'ButtonTertiary',
	extends: AbstractButtonComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonTertiaryTransitionController(this);
			this.isReady();
		},
	},
};
