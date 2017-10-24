import { AbstractTransitionComponent } from 'vue-transition-component';
import PageLoaderTransitionController from './PageLoaderTransitionController';

export default {
	name: 'PageLoader',
	extends: AbstractTransitionComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PageLoaderTransitionController(this);
			this.isReady();
		},
	},
};
