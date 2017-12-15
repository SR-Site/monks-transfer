import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import ServiceButtonTransitionController from './ServiceButtonTransitionController';

export default {
	name: 'ServiceButton',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.any.isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ServiceButtonTransitionController(this);
			this.isReady();
		},
		handleClick() {
			this.$emit('click');
		},
	},
};
