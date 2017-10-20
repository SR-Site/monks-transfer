import { AbstractTransitionComponent } from 'vue-transition-component';
import PrimaryTriangleTransitionController from './PrimaryTriangleTransitionController';

export default {
	name: 'PrimaryTriangle',
	extends: AbstractTransitionComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PrimaryTriangleTransitionController(this);
			this.isReady();
		},
	},
};
