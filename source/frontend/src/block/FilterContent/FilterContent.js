import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import FilterContentTransitionController from './FilterContentTransitionController';
import FilterContentData from './FilterContentData';

export default {
	name: 'FilterContent',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(FilterContentData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new FilterContentTransitionController(this);
			this.isReady();
		},
	},
};
