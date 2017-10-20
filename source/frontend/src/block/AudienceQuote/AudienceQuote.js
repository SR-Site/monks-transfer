import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import AudienceQuoteTransitionController from './AudienceQuoteTransitionController';
import AudienceQuoteData from './AudienceQuoteData';

export default {
	name: 'AudienceQuote',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(AudienceQuoteData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceQuoteTransitionController(this);
			this.isReady();
		},
	},
};
