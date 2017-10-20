import { AbstractContentPageComponent } from 'vue-block-system';
import ContentPageTransitionController from './ContentPageTransitionController';

export default {
	name: 'ContentPage',
	extends: AbstractContentPageComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ContentPageTransitionController(this);
			this.isReady();
		},
	},
};
