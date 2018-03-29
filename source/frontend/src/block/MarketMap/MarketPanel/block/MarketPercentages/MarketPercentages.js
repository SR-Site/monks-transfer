import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import BorderType from 'component/PercentageLoader/enum/BorderType';
import PercentageLoader from '../../../../../component/PercentageLoader';
import MarketPercentagesTransitionController from './MarketPercentagesTransitionController';

export default {
	name: 'MarketPercentages',
	extends: AbstractTransitionComponent,
	components: {
		PercentageLoader,
	},
	created() {
		this.BorderType = BorderType;
	},
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
			this.transitionController = new MarketPercentagesTransitionController(this);
			this.isReady();
		},
	},
};
