import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ContentService from 'net/service/ContentService';
import BlogPostTransitionController from './BlogPostTransitionController';
import BlogPostData from './BlogPostData';

export default {
	name: 'BlogPost',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(BlogPostData).isRequired,
	},
	mounted() {
		ContentService.viewCount(this.$router.currentRoute.path)
		.then(result => {
			this.viewCount = parseInt(result.data.totalcount,10 );
		})
		.catch(result => console.error(result))
	},
	data() {
		return {
			viewCount: this.data.count,
		};
	},
	computed: {
		readTimeLabel() {
			return this.$t(`global.article.stats.read_time`);
		},
		viewCountLabel() {
			return this.$t(`global.article.stats.${this.viewCount === 1 ? 'view' : 'views'}`);
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new BlogPostTransitionController(this);
			this.isReady();
		},
	},
};
