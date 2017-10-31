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
	computed: {
		readTimeLabel() {
			return this.$t(`global.article.stats.read_time`);
		},
		viewCountLabel() {
			return this.$t(`global.article.stats.${this.data.count === 1 ? 'view' : 'views'}`);
		},
		shareCountLabel() {
			return this.$t(`global.article.stats.${this.data.shares === 1 ? 'share' : 'shares'}`);
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new BlogPostTransitionController(this);
			this.isReady();
		},
	},
};
