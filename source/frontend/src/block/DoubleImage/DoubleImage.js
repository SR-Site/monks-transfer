import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import DoubleImageTransitionController from './DoubleImageTransitionController';
import DoubleImageData from './DoubleImageData';

export default {
	name: 'DoubleImage',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(DoubleImageData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new DoubleImageTransitionController(this);
			this.isReady();
		},
	},
};
