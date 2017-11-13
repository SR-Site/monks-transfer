import VueTypes from 'vue-types';
import AbstractScrollableBlock from '../../util/block/AbstractScrollableBlock';
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';
import LatestData from './LatestData';
import LatestTransitionController from './LatestTransitionController';

export default {
	name: 'Latest',
	extends: AbstractScrollableBlock,
	components: {
		ArticleTeaser,
	},
	props: {
		data: VueTypes.shape(LatestData).isRequired,
	},
	data() {
		return {
			itemCount: this.data.articles.length,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new LatestTransitionController(this);
			this.setupScrollableBlock();
			this.isReady();
		},
		getArticleData(article) {
			const clone = JSON.parse(JSON.stringify(article));

			// Add the required props
			return Object.assign(clone, {
				marginTop: 0,
				windowed: false,
				overlap: false,
			});
		},
	}
};
