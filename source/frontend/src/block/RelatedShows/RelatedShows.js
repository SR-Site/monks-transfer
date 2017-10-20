import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import RelatedShowsTransitionController from './RelatedShowsTransitionController';
import RelatedShowsData from './RelatedShowsData';

export default {
	name: 'RelatedShows',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(RelatedShowsData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new RelatedShowsTransitionController(this);
			this.isReady();
		},
	},
};
