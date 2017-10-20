import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import QuoteTransitionController from './QuoteTransitionController';
import QuoteData from './QuoteData';

export default {
	name: 'Quote',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(QuoteData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new QuoteTransitionController(this);
			this.isReady();
		},
	},
};
