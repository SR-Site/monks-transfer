import { AbstractTransitionComponent } from 'vue-transition-component';
import ScrollBarTransitionController from './ScrollBarTransitionController';
import DraggableInstance from '../../util/draggableInstance/DraggableInstance';
import DraggableInstanceEvent from '../../util/draggableInstance/DraggableInstanceEvent';

export default {
	name: 'ScrollBar',
	extends: AbstractTransitionComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ScrollBarTransitionController(this);
			this.draggableInstance = new DraggableInstance(
				this.$el,
				{
					maxDuration: 0.5,
				},
			);
			this.draggableInstance.addEventListener(DraggableInstanceEvent.UPDATE, event => {
				this.$emit('update', event.data.progress);
			});
			this.isReady();
		},
		setSnapPosition(x) {
			this.draggableInstance.setSnapPosition(x);
		},
		setEnabled(enabled) {
			this.draggableInstance.enabled = enabled;
		},
		setProgress(progress) {
			this.draggableInstance.progress = progress;
		},
		getMaxX() {
			return this.draggableInstance.maxX;
		}
	},
	beforeDestroy() {
		this.draggableInstance.dispose();
		this.draggableInstance = null;
	},
};
