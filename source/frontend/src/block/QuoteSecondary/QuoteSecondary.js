import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import QuoteSecondaryTransitionController from './QuoteSecondaryTransitionController';
import QuoteSecondaryData from './QuoteSecondaryData';

export default {
	name: 'QuoteSecondary',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(QuoteSecondaryData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new QuoteSecondaryTransitionController(this);
			this.isReady();
		},
	},
};
