import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import ProductTeaserTransitionController from './ProductTeaserTransitionController';
import ProductTeaserData from './ProductTeaserData';

export default {
	name: 'ProductTeaser',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(ProductTeaserData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ProductTeaserTransitionController(this);
			this.isReady();
		},
	},
};
