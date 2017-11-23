import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import MultipleImagesCallToActionData from './MultipleImagesCallToActionData';
import MultipleImagesCallToActionTransitionController from './MultipleImagesCallToActionTransitionController';

export default {
	name: 'MultipleImagesCallToAction',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(MultipleImagesCallToActionData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MultipleImagesCallToActionTransitionController(this);
			this.isReady();
		},
	},
};
