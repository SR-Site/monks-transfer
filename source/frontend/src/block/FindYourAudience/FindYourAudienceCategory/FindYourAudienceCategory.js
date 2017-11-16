import { AbstractTransitionComponent } from 'vue-transition-component';
import FindYourAudienceCategoryTransitionController from './FindYourAudienceCategoryTransitionController';
import VueTypes from 'vue-types';
import FindYourAudienceCategoryData from './FindYourAudienceCategoryData';
import FindYourAudienceTeaser from '../FindYourAudienceTeaser/FindYourAudienceTeaser';

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
