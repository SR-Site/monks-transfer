import VueTypes from 'vue-types';
import { AbstractTransitionComponent } from 'vue-transition-component';
import MarketComparePercentagesTransitionController from './MarketComparePercentagesTransitionController';

export default {
	name: 'MarketComparePercentages',
	extends: AbstractTransitionComponent,
	props: {
		marketId: VueTypes.string.isRequired,
		data: VueTypes.shape({
			heading: VueTypes.string,
			percentages: VueTypes.arrayOf(
				VueTypes.shape({
					label: VueTypes.string.isRequired,
					values: VueTypes.arrayOf(
						VueTypes.shape({
							label: VueTypes.string.isRequired,
							value: VueTypes.number.isRequired,
						}),
					).isRequired,
				}),
			).isRequired,
		}).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketComparePercentagesTransitionController(this);
			this.isReady();
		},
	},
};
