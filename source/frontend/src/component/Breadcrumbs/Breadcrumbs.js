import { AbstractTransitionComponent } from 'vue-transition-component';
import { mapGetters } from 'vuex';
import BreadcrumbsTransitionController from './BreadcrumbsTransitionController';
import PropLink from '../../data/prop-type/action/PropLink';
import VueTypes from 'vue-types';

export default {
	name: 'Breadcrumbs',
	extends: AbstractTransitionComponent,
	props: {
		breadcrumbs: VueTypes.arrayOf(
			VueTypes.shape(PropLink),
		).isRequired,
	},
	computed: {
		...mapGetters(
			{
				pageUrl: 'layout/pageUrl',
			},
		),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new BreadcrumbsTransitionController(this);
			this.isReady();
		},
	},
};
