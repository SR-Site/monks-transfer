import VueTypes from 'vue-types';
import SuccessStoriesBData from './SuccessStoriesBData';
import SuccessStoriesBTransitionController from './SuccessStoriesBTransitionController';
import AbstractScrollableBlock from '../../util/block/AbstractScrollableBlock';
import SuccessStoryTeaser from './SuccessStoryTeaser/SuccessStoryTeaser';

export default {
	name: 'SuccessStoriesB',
	extends: AbstractScrollableBlock,
	components: {
		SuccessStoryTeaser,
	},
	props: {
		data: VueTypes.shape(SuccessStoriesBData).isRequired,
	},
	data() {
		return {
			itemCount: this.data.stories.length,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SuccessStoriesBTransitionController(this);
			this.setupScrollableBlock();
			this.isReady();
		},
	},
};
