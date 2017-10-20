import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import LatestTransitionController from './LatestTransitionController';
import LatestData from './LatestData';

export default {
	name: 'Latest',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(LatestData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new LatestTransitionController(this);
			this.isReady();
		},
	},
};
