import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import NetworkDescriptionTransitionController from './NetworkDescriptionTransitionController';
import NetworkDescriptionData from './NetworkDescriptionData';

export default {
	name: 'NetworkDescription',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(NetworkDescriptionData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new NetworkDescriptionTransitionController(this);
			this.isReady();
		},
	},
};
