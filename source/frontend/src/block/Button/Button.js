import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ButtonTransitionController from './ButtonTransitionController';
import ButtonData from './ButtonData';

export default {
	name: 'Button',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ButtonData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonTransitionController(this);
			this.isReady();
		},
	},
};
