import padStart from 'lodash/padStart'
import VueTypes from 'vue-types';
import { AbstractTransitionComponent } from 'vue-transition-component';
import SlideTextTransitionController from './SlideTextTransitionController';

export default {
	name: 'SlideText',
	extends: AbstractTransitionComponent,
	props: {
		index: VueTypes.number.isRequired,
		heading: VueTypes.string.isRequired,
		paragraph: VueTypes.string.isRequired,
	},
	computed: {
		paddedIndex() {
			return padStart(this.index.toString(), 2, '0');
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SlideTextTransitionController(this);
			this.isReady();
		},
	},
};
