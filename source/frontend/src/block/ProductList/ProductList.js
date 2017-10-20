import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ProductListTransitionController from './ProductListTransitionController';
import ProductListData from './ProductListData';

export default {
	name: 'ProductList',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ProductListData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ProductListTransitionController(this);
			this.isReady();
		},
	},
};
