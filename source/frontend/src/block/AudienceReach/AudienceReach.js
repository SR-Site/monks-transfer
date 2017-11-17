import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import AudienceReachTransitionController from './AudienceReachTransitionController';
import AudienceReachData from './AudienceReachData';

export default {
	name: 'AudienceReach',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(AudienceReachData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceReachTransitionController(this);
			this.isReady();
		},
	},
};
