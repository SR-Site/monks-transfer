import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import GlossaryBannerTransitionController from './GlossaryBannerTransitionController';
import GlossaryBannerData from './GlossaryBannerData';

export default {
	name: 'GlossaryBanner',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(GlossaryBannerData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new GlossaryBannerTransitionController(this);
			this.isReady();
		},
	},
};
