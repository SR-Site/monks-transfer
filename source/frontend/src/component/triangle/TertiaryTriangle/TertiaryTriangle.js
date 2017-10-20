import { AbstractTransitionComponent } from 'vue-transition-component';
import TertiaryTriangleTransitionController from './TertiaryTriangleTransitionController';

export default {
	name: 'TertiaryTriangle',
	extends: AbstractTransitionComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new TertiaryTriangleTransitionController(this);
			this.isReady();
		},
	},
};
