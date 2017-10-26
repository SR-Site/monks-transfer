import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import InfoTransitionController from './InfoTransitionController';
import InfoData from './InfoData';

export default {
	name: 'Info',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(InfoData).isRequired,
		isNested: VueTypes.bool,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new InfoTransitionController(this);
			this.isReady();
		},
	},
};
