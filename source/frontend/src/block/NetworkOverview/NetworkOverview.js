import VueTypes from 'vue-types';
import { debounce } from 'lodash';
import { AbstractBlockComponent } from 'vue-block-system';
import NetworkOverviewTransitionController from './NetworkOverviewTransitionController';
import NetworkOverviewData from './NetworkOverviewData';
import DraggableInstance from '../../util/draggableInstance/DraggableInstance';
import DraggableInstanceEvent from '../../util/draggableInstance/DraggableInstanceEvent';
import NativeEventListener from '../../util/event/NativeEventListener';
import ScrollBar from '../../component/ScrollBar/ScrollBar';

export default {
	name: 'NetworkOverview',
	extends: AbstractBlockComponent,
	components: {
		ScrollBar,
	},
	props: {
		data: VueTypes.shape(NetworkOverviewData).isRequired,
	},
	data() {
		return {
			activeIndex: 0,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new NetworkOverviewTransitionController(this);
			this.draggableInstance = new DraggableInstance(
				this.$refs.draggableContainer,
				{
					maxDuration: 0.5,
					invert: true,
				},
			);
			this.draggableCompleteListener = new NativeEventListener(
				this.draggableInstance,
				DraggableInstanceEvent.UPDATE,
				this.handleDraggableUpdate,
			);
			this.resizeListener = new NativeEventListener(
				window,
				'resize',
				debounce(this.handleResize, 250),
			);
			this.scrollBar = this.getChild('ScrollBar');
			this.handleResize();
			this.isReady();
		},
		handleResize() {
			this.draggableInstance.setSnapPosition(
				this.$refs.draggableElement.offsetWidth / this.data.items.length,
			);
		},
		handleDraggableUpdate(event) {
			this.scrollBar.setProgress(event.data.progress);
		},
		handleScrollBarUpdate(progress) {
			clearTimeout(this.scrollBarEndTimeout);
			this.draggableInstance.update(progress);
		},
		handleScrollBarEnd() {
			clearTimeout(this.scrollBarEndTimeout);
			this.scrollBarEndTimeout = setTimeout(() => this.draggableInstance.snapToNearestPoint(), 50);
		},
	},
};
