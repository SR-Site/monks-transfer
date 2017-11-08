import VueTypes from 'vue-types';
import AbstractScrollableBlock from '../../util/block/AbstractScrollableBlock';
import ProductListData from './ProductListData';
import ProductListTransitionController from './ProductListTransitionController';
import ProductTeaser from './ProductTeaser/ProductTeaser';

export default {
	name: 'ProductList',
	extends: AbstractScrollableBlock,
	components: {
		ProductTeaser,
	},
	data() {
		return {
			itemCount: this.data.products.length,
		};
	},
	props: {
		data: VueTypes.shape(ProductListData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ProductListTransitionController(this);
			this.setupScrollableBlock();
			this.isReady();
		},
	},
};
