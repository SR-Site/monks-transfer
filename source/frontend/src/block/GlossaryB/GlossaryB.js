import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import GlossaryBTransitionController from './GlossaryBTransitionController';
import GlossaryBData from './GlossaryBData';

export default {
	name: 'GlossaryB',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(GlossaryBData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new GlossaryBTransitionController(this);
			this.isReady();
		},
	},
};
