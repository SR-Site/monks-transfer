import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ButtonQuinaryTransitionController from './ButtonQuinaryTransitionController';

export default {
	name: 'ButtonQuinary',
	extends: AbstractButtonComponent,
	props: {
		theme: VueTypes.number.isRequired,
		solid: VueTypes.bool.def(false),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonQuinaryTransitionController(this);
			this.isReady();
		},
	},
};
