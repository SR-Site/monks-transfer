import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import SmallHeadingTransitionController from './SmallHeadingTransitionController';
import SmallHeadingData from './SmallHeadingData';

export default {
	name: 'SmallHeading',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(SmallHeadingData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SmallHeadingTransitionController(this);
			this.isReady();
		},
	},
};
