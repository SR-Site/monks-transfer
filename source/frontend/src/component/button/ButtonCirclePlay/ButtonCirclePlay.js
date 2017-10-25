import { AbstractButtonComponent } from 'vue-block-system';
import ButtonCirclePlayTransitionController from './ButtonCirclePlayTransitionController';
import VueTypes from 'vue-types';

export default {
	name: 'ButtonCirclePlay',
	extends: AbstractButtonComponent,
	props: {
		isPlaying: VueTypes.bool.isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCirclePlayTransitionController(this);
			this.isReady();
		},
	},
};
