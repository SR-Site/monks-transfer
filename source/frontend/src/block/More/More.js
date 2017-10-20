import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import MoreTransitionController from './MoreTransitionController';
import MoreData from './MoreData';

export default {
	name: 'More',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(MoreData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MoreTransitionController(this);
			this.isReady();
		},
	},
};
