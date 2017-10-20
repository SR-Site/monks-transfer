import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import SmallImageTransitionController from './SmallImageTransitionController';
import SmallImageData from './SmallImageData';

export default {
	name: 'SmallImage',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(SmallImageData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SmallImageTransitionController(this);
			this.isReady();
		},
	},
};
