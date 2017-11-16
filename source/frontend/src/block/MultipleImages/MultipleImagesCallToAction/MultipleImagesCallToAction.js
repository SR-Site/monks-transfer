import { AbstractTransitionComponent } from 'vue-transition-component';
import MultipleImagesCallToActionTransitionController from './MultipleImagesCallToActionTransitionController';
import MultipleImagesCallToActionData from './MultipleImagesCallToActionData';
import VueTypes from 'vue-types';

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
