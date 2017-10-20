import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import TargetAudienceTransitionController from './TargetAudienceTransitionController';
import TargetAudienceData from './TargetAudienceData';

export default {
	name: 'TargetAudience',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(TargetAudienceData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new TargetAudienceTransitionController(this);
			this.isReady();
		},
	},
};
