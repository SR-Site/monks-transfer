import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import AudienceNetworksTransitionController from './AudienceNetworksTransitionController';
import AudienceNetworksData from './AudienceNetworksData';

export default {
	name: 'AudienceNetworks',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(AudienceNetworksData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceNetworksTransitionController(this);
			this.isReady();
		},
	},
};
