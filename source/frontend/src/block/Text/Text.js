import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import TextTransitionController from './TextTransitionController';
import TextData from './TextData';

export default {
	name: 'Text',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(TextData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new TextTransitionController(this);
			this.isReady();
		},
	},
};
