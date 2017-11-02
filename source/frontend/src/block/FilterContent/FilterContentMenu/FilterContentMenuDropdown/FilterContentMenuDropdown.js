import { AbstractTransitionComponent } from 'vue-transition-component';
import FilterContentMenuDropdownTransitionController from './FilterContentMenuDropdownTransitionController';
import VueTypes from 'vue-types';

export default {
	name: 'FilterContentMenuDropdown',
	extends: AbstractTransitionComponent,
	props: {
		chosenOptions: VueTypes.any.def({}),
		filter: VueTypes.number,
		options: VueTypes.arrayOf(
			VueTypes.shape(
				{
					value: VueTypes.string.isRequired,
					label: VueTypes.string.isRequired,
				},
			).isRequired,
		),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new FilterContentMenuDropdownTransitionController(this);
			this.isReady();
		},
		handleClose() {
			this.$emit('close');
		},
		handleOptionClick(option) {
			this.$emit('select', this.filter, option);
		},
		isActive(option) {
			const chosenOptions = this.chosenOptions[this.filter] || [];
			return chosenOptions.indexOf(option.value) > -1;
		},
	},
};
