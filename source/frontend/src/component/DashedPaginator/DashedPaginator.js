import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import DashedPaginatorTransitionController from './DashedPaginatorTransitionController';

export default {
	name: 'DashedPaginator',
	extends: AbstractTransitionComponent,
	props: {
		orientation: VueTypes.number.isRequired,
		items: VueTypes.arrayOf(VueTypes.any),
		activeIndex: VueTypes.number.isRequired,
	},
	data() {
		return {
			enabled: true,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new DashedPaginatorTransitionController(this);
			this.isReady();
		},
		enableInteraction() {
			this.enabled = true;
		},
		disableInteraction() {
			this.enabled = false;
		},
		handlePaginatorClick(index) {
			if (this.enabled) {
				this.$emit('paginatorClick', index);
			}
		},
	},
};
