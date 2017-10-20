import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ProgramModuleTransitionController from './ProgramModuleTransitionController';
import ProgramModuleData from './ProgramModuleData';

export default {
	name: 'ProgramModule',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ProgramModuleData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ProgramModuleTransitionController(this);
			this.isReady();
		},
	},
};
