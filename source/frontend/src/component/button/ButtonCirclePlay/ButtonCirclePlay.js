import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ButtonCirclePlayTransitionController from './ButtonCirclePlayTransitionController';

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
