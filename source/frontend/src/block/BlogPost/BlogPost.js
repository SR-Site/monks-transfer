import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import BlogPostTransitionController from './BlogPostTransitionController';
import BlogPostData from './BlogPostData';

export default {
	name: 'BlogPost',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(BlogPostData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new BlogPostTransitionController(this);
			this.isReady();
		},
	},
};
