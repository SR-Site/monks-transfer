import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import GlossaryATransitionController from './GlossaryATransitionController';
import GlossaryAData from './GlossaryAData';

export default {
	name: 'GlossaryA',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(GlossaryAData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new GlossaryATransitionController(this);
			this.isReady();
		},
	},
};
