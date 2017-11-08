import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import Scrollbar from '../../../util/ScrollBar';
import MarketSearchResultTransitionController from './MarketSearchResultTransitionController';

export default {
	name: 'MarketSearchResult',
	extends: AbstractTransitionComponent,
	watch: {
		height() {
			setTimeout(() => this.scrollBar.update(), 300);
		},
		results(value) {
			clearTimeout(this.resultTimeout);
			this.resultTimeout = setTimeout(() => {
				this.clonedResults = value;
			}, value.length === 0 ? 1000 : 0);
		},
	},
	props: {
		query: VueTypes.string.isRequired,
		results: VueTypes.array.isRequired,
		selectedMarket: VueTypes.any.isRequired,
		notFoundMessage: VueTypes.string.isRequired,
	},
	data() {
		return {
			clonedResults: [],
		};
	},
	computed: {
		isActive() {
			return this.selectedMarket === null && (this.clonedResults.length > 0 || this.query.length > 0);
		},
		height() {
			const rowHeight = 8;
			return `${Math.max(this.clonedResults.length * rowHeight, rowHeight)}rem`;
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketSearchResultTransitionController(this);
			this.scrollBar = new Scrollbar(
				this.$refs.scrollWrapper,
			);
			this.isReady();
		},
		handleSelectMarket(market) {
			this.$emit('selectMarket', market);
		},
	},
};
