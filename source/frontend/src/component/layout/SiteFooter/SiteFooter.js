import { AbstractTransitionComponent } from 'vue-transition-component';
import SiteFooterTransitionController from './SiteFooterTransitionController';

export default {
	name: 'SiteFooter',
	extends: AbstractTransitionComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SiteFooterTransitionController(this);
			this.isReady();
		},
	},
};
