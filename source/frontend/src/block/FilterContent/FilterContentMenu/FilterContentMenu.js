import { AbstractTransitionComponent } from 'vue-transition-component';
import { DeviceStateEvent } from 'seng-device-state-tracker';
import FilterContentMenuTransitionController from './FilterContentMenuTransitionController';
import VueTypes from 'vue-types';
import PropFilter from '../../../data/prop-type/action/PropFilter';
import FilterContentMenuDropdown from './FilterContentMenuDropdown/FilterContentMenuDropdown';
import NativeEventListener from '../../../util/event/NativeEventListener';
import { DeviceState } from '../../../config/deviceStateConfig';

export default {
	name: 'FilterContentMenu',
	extends: AbstractTransitionComponent,
	components: {
		FilterContentMenuDropdown,
	},
	data() {
		return {
			activeIndex: -1,
			mobileMenuActive: false,
			deviceState: this.$deviceState.currentState,
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
		activeFilterLabel() {
			return this.mobileMenuActive && this.deviceState <= DeviceState.SMALL ? this.closeLabel : this.filterLabel;
		},
		activeFilterIcon() {
			return this.mobileMenuActive && this.deviceState <= DeviceState.SMALL ? 'cross' : 'filter';
		}
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
		closeLabel: VueTypes.string.isRequired,
		filterLabel: VueTypes.string.isRequired,
		filters: VueTypes.arrayOf(
			VueTypes.shape(PropFilter).isRequired,
		).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new FilterContentMenuTransitionController(this);
			this.deviceStateListener = new NativeEventListener(
				this.$deviceState,
				DeviceStateEvent.STATE_UPDATE,
				event => {
					this.deviceState = event.data.state;
				},
			);
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

			if(this.deviceState <= DeviceState.SMALL) {
				this.handleFilterToggleClick();
			}
		},
		handleFilterToggleClick() {
			if (this.deviceState <= DeviceState.SMALL) {
				this.mobileMenuActive = !this.mobileMenuActive;
			}
		},
		handleFilterClick(index) {
			if (this.deviceState > DeviceState.SMALL) {
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
			}
		},
		chosenOptionCount(filter) {
			return this.chosenOptions[filter] ? this.chosenOptions[filter].length : 0;
		},
	},
};
