import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import SmallInfoTransitionController from './SmallInfoTransitionController';
import SmallInfoData from './SmallInfoData';

export default {
	name: 'SmallInfo',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(SmallInfoData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SmallInfoTransitionController(this);
			this.isReady();
		},
	},
};
