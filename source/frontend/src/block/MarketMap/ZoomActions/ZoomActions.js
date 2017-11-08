import { AbstractTransitionComponent } from 'vue-transition-component';
import ZoomActionsTransitionController from './ZoomActionsTransitionController';

export default {
	name: 'ZoomActions',
	extends: AbstractTransitionComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ZoomActionsTransitionController(this);
			this.isReady();
		},
		handleZoomIn() {
			this.$emit('zoomIn');
		},
		handleZoomOut() {
			this.$emit('zoomOut');
		}
	},
};
