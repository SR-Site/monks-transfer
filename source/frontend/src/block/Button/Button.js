import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ButtonTransitionController from './ButtonTransitionController';
import ButtonData from './ButtonData';
import Alignment from '../../data/enum/Alignment';

export default {
	name: 'Button',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ButtonData).isRequired,
	},
	computed: {
		mappedAlignment() {
			return `align-${Alignment[this.data.alignment].toLowerCase()}`;
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonTransitionController(this);
			this.isReady();
		},
	},
};
