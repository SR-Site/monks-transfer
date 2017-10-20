import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import NetworkOverviewTransitionController from './NetworkOverviewTransitionController';
import NetworkOverviewData from './NetworkOverviewData';

export default {
	name: 'NetworkOverview',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(NetworkOverviewData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new NetworkOverviewTransitionController(this);
			this.isReady();
		},
	},
};
