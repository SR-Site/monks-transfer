import truncate from 'lodash/truncate';
import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ArticleTeaserData from './ArticleTeaserData';
import ArticleTeaserTransitionController from './ArticleTeaserTransitionController';

export default {
	name: 'ArticleTeaser',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ArticleTeaserData).isRequired,
	},
	data() {
		return {
			isHover: false,
		};
	},
	computed: {
		truncatedParagraph() {
			return truncate(this.data.paragraph, {
				length: 60,
				separator: ' ',
			});
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ArticleTeaserTransitionController(this);
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
