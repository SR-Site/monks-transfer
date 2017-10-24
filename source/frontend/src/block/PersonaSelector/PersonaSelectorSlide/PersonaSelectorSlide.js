import { truncate } from 'lodash';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import PersonaSelectorSlideTransitionController from './PersonaSelectorSlideTransitionController';

export default {
	name: 'PersonaSelectorSlide',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.any.isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PersonaSelectorSlideTransitionController(this);
			this.isReady();
		},
		truncate(string, length) {
			return truncate(string, {
				length,
				separator: ' ',
			});
		},
	},
};
