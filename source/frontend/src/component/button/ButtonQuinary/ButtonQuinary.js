import { AbstractButtonComponent } from 'vue-block-system';
import ButtonQuinaryTransitionController from './ButtonQuinaryTransitionController';
import VueTypes from 'vue-types';

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
