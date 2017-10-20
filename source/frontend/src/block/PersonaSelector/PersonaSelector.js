import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import PersonaSelectorTransitionController from './PersonaSelectorTransitionController';
import PersonaSelectorData from './PersonaSelectorData';

export default {
	name: 'PersonaSelector',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(PersonaSelectorData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PersonaSelectorTransitionController(this);
			this.isReady();
		},
	},
};
