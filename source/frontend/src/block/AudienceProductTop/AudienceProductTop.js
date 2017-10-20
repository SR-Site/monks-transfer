import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import AudienceProductTopTransitionController from './AudienceProductTopTransitionController';
import AudienceProductTopData from './AudienceProductTopData';

export default {
	name: 'AudienceProductTop',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(AudienceProductTopData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceProductTopTransitionController(this);
			this.isReady();
		},
	},
};
