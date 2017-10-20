import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import BlogPostBTransitionController from './BlogPostBTransitionController';
import BlogPostBData from './BlogPostBData';

export default {
	name: 'BlogPostB',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(BlogPostBData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new BlogPostBTransitionController(this);
			this.isReady();
		},
	},
};
