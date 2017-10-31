import { AbstractButtonComponent } from 'vue-block-system';
import ButtonQuaternaryTransitionController from './ButtonQuaternaryTransitionController';
import VueTypes from 'vue-types';

export default {
	name: 'ButtonQuaternary',
	extends: AbstractButtonComponent,
	props: {
		theme: VueTypes.number.isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonQuaternaryTransitionController(this);
			this.isReady();
		},
	},
};
