import VueTypes from 'vue-types';
import AbstractScrollableBlock from '../../util/block/AbstractScrollableBlock';
import NetworkOverviewData from './NetworkOverviewData';
import NetworkOverviewTransitionController from './NetworkOverviewTransitionController';

export default {
	name: 'NetworkOverview',
	extends: AbstractScrollableBlock,
	props: {
		data: VueTypes.shape(NetworkOverviewData).isRequired,
	},
	data() {
		return {
			itemCount: this.data.items.length,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new NetworkOverviewTransitionController(this);
			this.setupScrollableBlock();
			this.isReady();
		},
	},
};
