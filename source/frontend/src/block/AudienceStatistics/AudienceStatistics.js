import VueTypes from 'vue-types';
import AbstractScrollableBlock from '../../util/block/AbstractScrollableBlock';
import AudienceStatisticsData from './AudienceStatisticsData';
import AudienceStatisticsTransitionController from './AudienceStatisticsTransitionController';
import AudienceStatisticTeaser from './AudienceStatisticTeaser/AudienceStatisticTeaser';

export default {
	name: 'AudienceStatistics',
	extends: AbstractScrollableBlock,
	data() {
		return {
			itemCount: this.data.items.length,
		};
	},
	components: {
		AudienceStatisticTeaser
	},
	props: {
		data: VueTypes.shape(AudienceStatisticsData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceStatisticsTransitionController(this);
			this.setupScrollableBlock();
			this.isReady();
		},
	},
};
