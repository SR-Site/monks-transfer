import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import FindYourAudienceTeaser from '../FindYourAudienceTeaser/FindYourAudienceTeaser';
import FindYourAudienceCategoryData from './FindYourAudienceCategoryData';
import FindYourAudienceCategoryTransitionController from './FindYourAudienceCategoryTransitionController';

export default {
	name: 'FindYourAudienceCategory',
	extends: AbstractTransitionComponent,
	components: {
		FindYourAudienceTeaser,
	},
	props: {
		data: VueTypes.shape(FindYourAudienceCategoryData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new FindYourAudienceCategoryTransitionController(this);
			this.isReady();
		},
	},
};
