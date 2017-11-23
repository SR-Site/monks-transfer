import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import FindYourAudienceCategoryData from './FindYourAudienceCategoryData';
import FindYourAudienceCategoryTransitionController from './FindYourAudienceCategoryTransitionController';

export default {
	name: 'FindYourAudienceCategory',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(FindYourAudienceCategoryData).isRequired,
	},
	methods: {
		handleBackToTop() {
			this.$emit('backToTop');
		},
		handleAllComponentsReady() {
			this.transitionController = new FindYourAudienceCategoryTransitionController(this);
			this.isReady();
		},
		handleComponentReady(component) {
			component.transitionIn();
		},
		getAudienceData(data) {
			const clone = JSON.parse(JSON.stringify(data));

			// Add the required props
			return Object.assign(clone, {
				marginTop: 0,
				windowed: false,
				overlap: false,
			});
		},
	},
};
