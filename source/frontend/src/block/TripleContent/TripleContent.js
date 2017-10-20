import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import TripleContentTransitionController from './TripleContentTransitionController';
import TripleContentData from './TripleContentData';

export default {
	name: 'TripleContent',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(TripleContentData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new TripleContentTransitionController(this);
			this.isReady();
		},
	},
};
