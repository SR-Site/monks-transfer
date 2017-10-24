import { TransitionEvent } from 'vue-transition-component';
import { truncate } from 'lodash';
import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ArticleTeaserData from './ArticleTeaserData';
import ArticleTeaserTransitionController from './ArticleTeaserTransitionController';
import NativeEventListener from '../../util/event/NativeEventListener';

export default {
	name: 'ArticleTeaser',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ArticleTeaserData).isRequired,
	},
	data() {
		return {
			transitionInComplete: false,
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
			const transitionInCompleteListener = new NativeEventListener(
				this.transitionController,
				TransitionEvent.TRANSITION_IN_COMPLETE,
				() => {
					transitionInCompleteListener.dispose();
					this.transitionInComplete = true;
				},
			);
			this.isReady();
		},
	},
};
