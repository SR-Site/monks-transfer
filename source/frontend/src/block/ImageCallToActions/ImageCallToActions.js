import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ImageCallToActionsTransitionController from './ImageCallToActionsTransitionController';
import ImageCallToActionsData from './ImageCallToActionsData';

export default {
	name: 'ImageCallToActions',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ImageCallToActionsData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ImageCallToActionsTransitionController(this);
			this.isReady();
		},
	},
};
