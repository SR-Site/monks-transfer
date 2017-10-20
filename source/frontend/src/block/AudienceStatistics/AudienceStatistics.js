import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import AudienceStatisticsTransitionController from './AudienceStatisticsTransitionController';
import AudienceStatisticsData from './AudienceStatisticsData';

export default {
	name: 'AudienceStatistics',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(AudienceStatisticsData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceStatisticsTransitionController(this);
			this.isReady();
		},
	},
};
