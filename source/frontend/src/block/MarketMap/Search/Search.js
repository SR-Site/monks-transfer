import Fuse from 'fuse.js';
import VueTypes from 'vue-types';
import { AbstractTransitionComponent } from 'vue-transition-component';
import Scrollbar from '../../../util/ScrollBar';
import SearchTransitionController from './SearchTransitionController';

export default {
	name: 'Search',
	extends: AbstractTransitionComponent,
	data() {
		return {
			hasFocus: false,
			results: [],
			query: '',
		};
	},
	props: {
		markets: VueTypes.arrayOf(
			VueTypes.shape({
				city: VueTypes.string.isRequired,
				statePostalCode: VueTypes.string.isRequired,
				marketId: VueTypes.string.isRequired,
			}),
		).isRequired,
	},
	watch: {
		query(value) {
			if (value) {
				this.results = this.list.search(value);
			} else {
				this.results = this.markets;
			}
		},
		hasFocus(value) {
			if (value && this.query.length === 0) {
				this.results = this.markets;
			}
		},
		results() {
			if (this.scrollbar) {
				this.$nextTick(() => this.scrollbar.update());
			}
		},
	},
	computed: {
		showResults() {
			return this.hasFocus || this.query.length > 0;
		},
		list() {
			return new Fuse(this.markets, {
				shouldSort: true,
				location: 0,
				threshold: 0.25,
				distance: 100,
				maxPatternLength: 32,
				minMatchCharLength: 1,
				keys: ['city', 'statePostalCode'],
			});
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SearchTransitionController(this);
			this.scrollbar = new Scrollbar(this.$refs.scrollWrapper, {
				setContentSize: false,
			});
			this.isReady();
		},
		handleFocus() {
			this.hasFocus = true;
		},
		handleBlur() {
			// Short delay otherwise you won't be able to click on the market
			setTimeout(() => {
				this.hasFocus = false;
			}, 300);
		},
		handleMarketClick(market) {
			this.$emit('selectMarket', market);
			this.query = '';
		},
		handleFormSubmit() {
			if(this.results.length === 1) {
				this.handleMarketClick(this.results[0]);
			}
		},
	},
};
