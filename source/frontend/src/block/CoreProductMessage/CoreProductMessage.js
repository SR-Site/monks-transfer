import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import CoreProductMessageTransitionController from './CoreProductMessageTransitionController';
import CoreProductMessageData from './CoreProductMessageData';

export default {
	name: 'CoreProductMessage',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(CoreProductMessageData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new CoreProductMessageTransitionController(this);
			this.isReady();
		},
	},
};
