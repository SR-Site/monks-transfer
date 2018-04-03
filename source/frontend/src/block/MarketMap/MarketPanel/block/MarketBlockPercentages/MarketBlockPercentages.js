import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import MarketBlockPercentagesTransitionController from './MarketBlockPercentagesTransitionController';

export default {
	name: 'MarketBlockPercentages',
	extends: AbstractTransitionComponent,
	props: {
		marketId: VueTypes.string.isRequired,
		data: VueTypes.shape({
			heading: VueTypes.string,
			percentages: VueTypes.arrayOf(
				VueTypes.shape({
					label: VueTypes.string.isRequired,
					value: VueTypes.number.isRequired,
				}),
			).isRequired,
		}).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketBlockPercentagesTransitionController(this);
			this.isReady();
		},
	},
};
