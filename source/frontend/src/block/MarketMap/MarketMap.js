import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import MarketMapTransitionController from './MarketMapTransitionController';
import MarketMapData from './MarketMapData';

export default {
	name: 'MarketMap',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(MarketMapData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketMapTransitionController(this);
			this.isReady();
		},
	},
};
