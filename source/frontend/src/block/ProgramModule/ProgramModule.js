import VueTypes from 'vue-types';
import AbstractScrollableBlock from '../../util/block/AbstractScrollableBlock';
import ProgramModuleData from './ProgramModuleData';
import ProgramModuleTransitionController from './ProgramModuleTransitionController';
import ProgramTeaser from './ProgramTeaser/ProgramTeaser';

export default {
	name: 'ProgramModule',
	extends: AbstractScrollableBlock,
	components: {
		ProgramTeaser,
	},
	data() {
		return {
			itemCount: this.data.items.length,
		};
	},
	props: {
		data: VueTypes.shape(ProgramModuleData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ProgramModuleTransitionController(this);
			this.setupScrollableBlock();
			this.isReady();
		},
	},
};
