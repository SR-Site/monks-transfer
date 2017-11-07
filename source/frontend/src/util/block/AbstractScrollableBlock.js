import { AbstractBlockComponent } from 'vue-block-system';
import ScrollBar from '../../component/ScrollBar/ScrollBar';
import DraggableInstanceEvent from '../../util/draggableInstance/DraggableInstanceEvent';
import DraggableInstance from '../draggableInstance/DraggableInstance';
import DisposableHelper from '../event/DisposableHelper';
import NativeEventListener from '../event/NativeEventListener';
import { debounce } from 'lodash';

export default {
	name: 'AbstractScrollableBlock',
	extends: AbstractBlockComponent,
	components: {
		ScrollBar,
	},
	created() {
		this.disposables = new DisposableHelper();
	},
	data() {
		return {
			itemCount: 0,
			showScrollBar: true,
		};
	},
	methods: {
		setupScrollableBlock() {
			this.createDraggableInstance();
			this.createEventListeners();
			this.handleResize();
		},
		createDraggableInstance() {
			this.draggable = new DraggableInstance(
				this.$refs.draggableContainer,
				{
					maxDuration: 0.5,
					invert: true,
				},
			);

			if (this.draggable.enabled) {
				this.handleDraggableEnable();
			} else {
				this.handleDraggableDisable();
			}
		},
		createEventListeners() {
			this.disposables.add(
				new NativeEventListener(this.draggable, DraggableInstanceEvent.UPDATE, this.handleDraggableUpdate),
			);
			this.disposables.add(
				new NativeEventListener(this.draggable, DraggableInstanceEvent.ENABLE, this.handleDraggableEnable),
			);
			this.disposables.add(
				new NativeEventListener(this.draggable, DraggableInstanceEvent.DISABLE, this.handleDraggableDisable),
			);
			this.disposables.add(
				new NativeEventListener(window, 'resize', debounce(this.handleResize, 250)),
			);
		},
		handleDraggableEnable() {
			this.showScrollBar = true;
		},
		handleDraggableDisable() {
			this.showScrollBar = false;
			// Reset the progress back to 0
			this.draggable.progress = 0;
		},
		handleResize() {
			this.draggable.update();
			this.draggable.setSnapPosition(
				this.$refs.draggableElement.offsetWidth / this.itemCount,
			);
		},
		handleDraggableUpdate(event) {
			this.getChild('ScrollBar').setProgress(event.data.progress);
		},
		handleScrollBarUpdate(progress) {
			clearTimeout(this.scrollBarEndTimeout);
			this.draggable.update(progress);
		},
		handleScrollBarEnd() {
			clearTimeout(this.scrollBarEndTimeout);
			this.scrollBarEndTimeout = setTimeout(() => this.draggable.snapToNearestPoint(), 10);
		},
	},
	beforeDestroy() {
		this.disposables.dispose();
		this.disposables = null;
		this.draggable.dispose();
		this.draggable = null;
	},
};
