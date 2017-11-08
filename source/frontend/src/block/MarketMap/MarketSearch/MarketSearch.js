import { AbstractTransitionComponent } from 'vue-transition-component';
import MarketSearchTransitionController from './MarketSearchTransitionController';
import VueTypes from 'vue-types';
import MarketSearchResult from '../MarketSearchResult/MarketSearchResult';

export default {
	name: 'MarketSearch',
	extends: AbstractTransitionComponent,
	components: {
		MarketSearchResult,
	},
	watch: {
		query(value) {
			if (value.length === 0 && this.selectedMarket !== null) {
				this.clearSearch();
			}
		},
		selectedMarket(value) {
			this.query = value ? `${value.city}, ${value.statePostalCode}` : '';
		},
	},
	computed: {
		results() {
			return this.markets.filter(market => {
				const query = this.query.toLowerCase();
				const city = market.city.toLowerCase();
				const state = this.states.find(state => state.id === market.statePostalCode).label.toLowerCase();
				return query.length > 1 && (city.indexOf(query) > -1 || state.indexOf(query) > -1);
			});
		},
	},
	props: {
		markets: VueTypes.array.isRequired,
		states: VueTypes.array.isRequired,
		selectedMarket: VueTypes.any.isRequired,
		searchPlaceholder: VueTypes.string.isRequired,
		notFoundMessage: VueTypes.string.isRequired,
		searchLabel: VueTypes.string.isRequired,
	},
	data() {
		return {
			query: '',
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketSearchTransitionController(this);
			this.isReady();
		},
		clearSearch() {
			this.query = '';
			this.$emit('resetMarket');
		},
		handleInputChange(event) {
			this.query = event.target.value;
		},
		handleSelectMarket(market) {
			this.$emit('selectMarket', market);
		},
		handleSubmit() {
			console.log('do nothing');
		},
	},
};
