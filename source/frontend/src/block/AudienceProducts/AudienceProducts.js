import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import AudienceProductsTransitionController from './AudienceProductsTransitionController';
import AudienceProductsData from './AudienceProductsData';

export default {
	name: 'AudienceProducts',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(AudienceProductsData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceProductsTransitionController(this);
			this.isReady();
		},
	},
};
