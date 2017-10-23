import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import LatestTransitionController from './LatestTransitionController';
import LatestData from './LatestData';
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';

export default {
	name: 'Latest',
	extends: AbstractBlockComponent,
	components: {
		ArticleTeaser,
	},
	props: {
		data: VueTypes.shape(LatestData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new LatestTransitionController(this);
			this.isReady();
		},
		getArticleData(article) {
			const clone = JSON.parse(JSON.stringify(article));

			// clone.marginTop = 0;
			// clone.overlap = false;
			// clone.wi = false;

			// Add the required props
			return Object.assign(clone, {
				marginTop: 0,
				windowed: false,
				overlap: false,
			});
		},
	},
};
