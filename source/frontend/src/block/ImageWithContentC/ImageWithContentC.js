import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ImageWithContentCTransitionController from './ImageWithContentCTransitionController';
import ImageWithContentCData from './ImageWithContentCData';
import { truncate } from 'lodash';

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
