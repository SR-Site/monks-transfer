import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import MultipleImagesTransitionController from './MultipleImagesTransitionController';
import MultipleImagesData from './MultipleImagesData';
import MultipleImagesMedia from './MultipleImagesMedia/MultipleImagesMedia';
import MultipleImagesSkills from './MultipleImagesSkills/MultipleImagesSkills';
import MultipleImagesCallToAction from './MultipleImagesCallToAction/MultipleImagesCallToAction';

export default {
	name: 'MultipleImages',
	extends: AbstractBlockComponent,
	components: {
		MultipleImagesMedia,
		MultipleImagesSkills,
		MultipleImagesCallToAction,
	},
	props: {
		data: VueTypes.shape(MultipleImagesData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MultipleImagesTransitionController(this);
			this.isReady();
		},
	},
};
