import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import FreeTextTransitionController from './FreeTextTransitionController';
import FreeTextData from './FreeTextData';

export default {
	name: 'FreeText',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(FreeTextData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new FreeTextTransitionController(this);
			this.isReady();
		},
	},
};
