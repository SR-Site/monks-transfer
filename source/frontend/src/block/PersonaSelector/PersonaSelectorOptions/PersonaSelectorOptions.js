import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import { padStart } from 'lodash';
import PersonaSelectorOptionsTransitionController from './PersonaSelectorOptionsTransitionController';

export default {
	name: 'PersonaSelectorOptions',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.any.isRequired,
		enableInteraction: VueTypes.bool.isRequired,
	},
	data() {
		return {
			activeIndex: 0,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PersonaSelectorOptionsTransitionController(this);
			this.isReady();
		},
		padStart(value) {
			return padStart(value.toString(), 2, '0');
		},
		handlePersonaClick(index) {
			if (this.enableInteraction) {
				this.activeIndex = index;
				this.$emit('personaClick', index);
			}
		},
	},
};
