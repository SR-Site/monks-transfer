import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import { mapGetters } from 'vuex';
import PropLink from '../../data/prop-type/action/PropLink';
import BreadcrumbsTransitionController from './BreadcrumbsTransitionController';

export default {
	name: 'Breadcrumbs',
	extends: AbstractTransitionComponent,
	props: {
		breadcrumbs: VueTypes.arrayOf(VueTypes.shape(PropLink)).isRequired,
	},
	computed: {
		...mapGetters({
			pageUrl: 'layout/pageUrl',
		}),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new BreadcrumbsTransitionController(this);
			this.isReady();
		},
		stripSlash(target) {
			return target.replace(/^\/+/g, '');
		},
	},
};
