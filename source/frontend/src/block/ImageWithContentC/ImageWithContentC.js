import truncate from 'lodash/truncate';
import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ImageWithContentCData from './ImageWithContentCData';
import ImageWithContentCTransitionController from './ImageWithContentCTransitionController';

export default {
	name: 'ImageWithContentC',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ImageWithContentCData).isRequired,
	},
	computed: {
		truncatedParagraph() {
			return truncate(this.data.paragraph, {
				length: 500,
				separator: ' ',
			});
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ImageWithContentCTransitionController(this);
			this.isReady();
		},
	},
};
