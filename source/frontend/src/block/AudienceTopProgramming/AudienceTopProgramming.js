import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import AudienceTopProgrammingTransitionController from './AudienceTopProgrammingTransitionController';
import AudienceTopProgrammingData from './AudienceTopProgrammingData';

export default {
	name: 'AudienceTopProgramming',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(AudienceTopProgrammingData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceTopProgrammingTransitionController(this);
			this.isReady();
		},
	},
};
