import { AbstractTransitionComponent } from 'vue-transition-component';
import SpinnerTransitionController from './SpinnerTransitionController';

export default {
	name: 'Spinner',
	extends: AbstractTransitionComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SpinnerTransitionController(this);
			this.isReady();
		},
	},
};
