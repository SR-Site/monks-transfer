import truncate from 'lodash/truncate';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import ProductTeaserData from './ProductTeaserData';
import ProductTeaserTransitionController from './ProductTeaserTransitionController';

export default {
	name: 'ProductTeaser',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(ProductTeaserData).isRequired,
	},
	computed: {
		truncatedParagraph() {
			return truncate(this.data.paragraph, {
				length: 100,
				separator: ' ',
			});
		},
	},
	data() {
		return {
			isHover: false,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ProductTeaserTransitionController(this);
			this.isReady();
		},
		handleMouseEnter() {
			this.isHover = true;
		},
		handleMouseLeave() {
			this.isHover = false;
		},
	},
};
