import { AbstractTransitionComponent } from 'vue-transition-component';
import SecondaryTriangleTransitionController from './SecondaryTriangleTransitionController';

export default {
	name: 'SecondaryTriangle',
	extends: AbstractTransitionComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SecondaryTriangleTransitionController(this);
			this.isReady();
		},
	},
};
