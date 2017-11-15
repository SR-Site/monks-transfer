import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import AudienceStatisticsBTransitionController from './AudienceStatisticsBTransitionController';
import AudienceStatisticsBData from './AudienceStatisticsBData';

export default {
	name: 'AudienceStatisticsB',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(AudienceStatisticsBData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceStatisticsBTransitionController(this);
			this.isReady();
		},
	},
};
