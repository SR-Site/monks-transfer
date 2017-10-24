import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ButtonCallToReachTransitionController from './ButtonCallToReachTransitionController';

export default {
	name: 'ButtonCallToReach',
	extends: AbstractButtonComponent,
	props: {
		icon: VueTypes.string.isRequired,
		theme: VueTypes.number.isRequired,
	},
	computed: {
		mappedTheme() {
			return this.Theme[this.theme].toLowerCase();
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCallToReachTransitionController(this);
			this.isReady();
		},
	},
};
