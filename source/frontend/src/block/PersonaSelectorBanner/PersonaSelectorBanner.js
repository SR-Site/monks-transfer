import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import PersonaSelectorBannerTransitionController from './PersonaSelectorBannerTransitionController';
import PersonaSelectorBannerData from './PersonaSelectorBannerData';

export default {
	name: 'PersonaSelectorBanner',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(PersonaSelectorBannerData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PersonaSelectorBannerTransitionController(this);
			this.isReady();
		},
	},
};
