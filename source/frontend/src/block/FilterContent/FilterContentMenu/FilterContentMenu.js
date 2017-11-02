import { AbstractTransitionComponent } from 'vue-transition-component';
import FilterContentMenuTransitionController from './FilterContentMenuTransitionController';
import VueTypes from 'vue-types';
import PropFilter from '../../../data/prop-type/action/PropFilter';
import FilterContentMenuDropdown from './FilterContentMenuDropdown/FilterContentMenuDropdown';

export default {
	name: 'FilterContentMenu',
	extends: AbstractTransitionComponent,
	components: {
		FilterContentMenuDropdown,
	},
	data() {
		return {
			activeIndex: -1,
			chosenOptions: {},
		};
	},
	computed: {
		activeFilterOptions() {
			return this.filters[this.activeIndex] ? this.filters[this.activeIndex].options : [];
		},
		activeFilter() {
			return this.filters[this.activeIndex] ? this.filters[this.activeIndex].type : null;
		},
	},
	watch: {
		chosenOptions(value) {
			const result = {};

			Object.keys(value).forEach(key => {
				result[key] = value[key].join(',');
			});

			// Notify the parent about the selected filters
			this.$emit('update', result);
		},
	},
	props: {
		filters: VueTypes.arrayOf(
			VueTypes.shape(PropFilter).isRequired,
		).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new FilterContentMenuTransitionController(this);
			this.dropdown = this.getChild('FilterContentMenuDropdown');
			this.isReady();
		},
		handleClose() {
			this.handleFilterClick(this.activeIndex);
		},
		handleFilterOptionSelect(filter, option) {
			if (!this.chosenOptions[filter]) {
				this.chosenOptions[filter] = [];
			}

			if (this.chosenOptions[filter].indexOf(option.value) > -1) {
				this.chosenOptions[filter].splice(
					this.chosenOptions[filter].indexOf(option.value),
					1,
				);
			} else {
				this.chosenOptions[filter].push(option.value);
			}

			// Force an update
			this.chosenOptions = Object.assign({}, this.chosenOptions);
		},
		handleFilterClick(index) {
			if (this.activeIndex === index) {
				this.dropdown.transitionOut()
				.then(() => this.activeIndex = -1);
			} else {
				if (this.activeIndex === -1) {
					this.activeIndex = index;
					this.dropdown.transitionIn();
				} else {
					this.dropdown.transitionOut()
					.then(() => this.activeIndex = index)
					.then(() => this.dropdown.transitionIn());
				}
			}
		},
		chosenOptionCount(filter) {
			return this.chosenOptions[filter] ? this.chosenOptions[filter].length : 0;
		},
	},
};
