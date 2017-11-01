import { AbstractTransitionComponent } from 'vue-transition-component';
import BreadcrumbsTransitionController from './BreadcrumbsTransitionController';
import PropLink from '../../data/prop-type/action/PropLink';
import VueTypes from 'vue-types';

export default {
	name: 'Breadcrumbs',
	extends: AbstractTransitionComponent,
	props: {
		breadcrumbs: VueTypes.arrayOf(
			VueTypes.shape(PropLink),
		),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new BreadcrumbsTransitionController(this);
			this.isReady();
		},
	},
};
