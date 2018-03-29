import { AbstractTransitionComponent } from 'vue-transition-component';
import StringUtils from 'util/StringUtils';
import VueTypes from 'vue-types';
import MarketNumbersTransitionController from './MarketNumbersTransitionController';

export default {
	name: 'MarketNumbers',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape({
			heading: VueTypes.string,
			statistics: VueTypes.arrayOf(
				VueTypes.shape({
					label: VueTypes.string,
					value: VueTypes.number.isRequired,
				}).isRequired,
			).isRequired,
		}),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketNumbersTransitionController(this);
			this.isReady();
		},
		formatNumber(number) {
			return StringUtils.format(number, ',', ',');
		},
	},
};
