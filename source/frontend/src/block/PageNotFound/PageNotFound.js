import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import PageNotFoundTransitionController from './PageNotFoundTransitionController';
import PageNotFoundData from './PageNotFoundData';

export default {
	name: 'PageNotFound',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(PageNotFoundData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PageNotFoundTransitionController(this);
			this.isReady();
		},
	},
};
