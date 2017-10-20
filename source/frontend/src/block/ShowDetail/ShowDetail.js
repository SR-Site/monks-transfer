import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ShowDetailTransitionController from './ShowDetailTransitionController';
import ShowDetailData from './ShowDetailData';

export default {
	name: 'ShowDetail',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ShowDetailData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ShowDetailTransitionController(this);
			this.isReady();
		},
	},
};
