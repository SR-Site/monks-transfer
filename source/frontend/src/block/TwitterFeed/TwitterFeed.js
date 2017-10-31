import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import TwitterFeedTransitionController from './TwitterFeedTransitionController';
import TwitterFeedData from './TwitterFeedData';

export default {
	name: 'TwitterFeed',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(TwitterFeedData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new TwitterFeedTransitionController(this);
			this.isReady();
		},
	},
};
