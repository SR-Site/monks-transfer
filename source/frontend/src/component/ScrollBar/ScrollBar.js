import Theme from 'data/enum/Theme';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import DraggableInstance from '../../util/draggableInstance/DraggableInstance';
import DraggableInstanceEvent from '../../util/draggableInstance/DraggableInstanceEvent';
import ScrollBarTransitionController from './ScrollBarTransitionController';

export default {
	name: 'ScrollBar',
	extends: AbstractTransitionComponent,
	props: {
		theme: VueTypes.number.def(Theme.DARK),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ScrollBarTransitionController(this);
			this.draggableInstance = new DraggableInstance(this.$el, {
				maxDuration: 0.5,
			});
			this.draggableInstance.addEventListener(DraggableInstanceEvent.UPDATE, event => {
				this.$emit('update', event.data.progress);
			});
			this.draggableInstance.addEventListener(DraggableInstanceEvent.THROW_COMPLETE, event => {
				this.$emit('end', event.data.progress);
			});
			this.draggableInstance.addEventListener(DraggableInstanceEvent.DRAG_END, event => {
				this.$emit('end', event.data.progress);
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
		},
	},
	beforeDestroy() {
		this.draggableInstance.dispose();
		this.draggableInstance = null;
	},
};
