import { AbstractButtonComponent } from 'vue-block-system';
import ButtonCircleCloseTransitionController from './ButtonCircleCloseTransitionController';
import VueTypes from 'vue-types';

export default {
	name: 'ButtonCircleClose',
	extends: AbstractButtonComponent,
	props: {
		size: VueTypes.number.isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCircleCloseTransitionController(this);
			this.isReady();
		},
	},
};
