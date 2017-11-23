import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import PercentageLoaderBorderType from '../../component/PercentageLoader/enum/BorderType';
import PercentageLoader from '../../component/PercentageLoader/PercentageLoader';
import AudienceStatisticsBData from './AudienceStatisticsBData';
import AudienceStatisticsBTransitionController from './AudienceStatisticsBTransitionController';

export default {
	name: 'AudienceStatisticsB',
	extends: AbstractBlockComponent,
	components: {
		PercentageLoader,
	},
	beforeCreate() {
		this.PercentageLoaderBorderType = PercentageLoaderBorderType;
	},
	props: {
		data: VueTypes.shape(AudienceStatisticsBData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceStatisticsBTransitionController(this);
			this.isReady();
		},
		handleNextSectionClick() {},
	},
};
