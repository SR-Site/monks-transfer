import { AbstractButtonComponent } from 'vue-block-system';
import ButtonCallToReachTransitionController from './ButtonCallToReachTransitionController';
import VueTypes from 'vue-types';

export default {
	name: 'ButtonCallToReach',
	extends: AbstractButtonComponent,
	props: {
		icon: VueTypes.string.isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCallToReachTransitionController(this);
			this.isReady();
		},
	},
};
