import { AbstractTransitionComponent } from 'vue-transition-component';
import SlideTextTransitionController from './SlideTextTransitionController';
import { padStart } from 'lodash';
import VueTypes from 'vue-types';

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
			return padStart(this.index, 2, '0');
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SlideTextTransitionController(this);
			this.isReady();
		},
	},
};
