import VueTypes from 'vue-types';
import { DeviceStateEvent } from 'seng-device-state-tracker';
import { AbstractBlockComponent } from 'vue-block-system';
import TargetAudienceTransitionController from './TargetAudienceTransitionController';
import TargetAudienceData from './TargetAudienceData';
import DraggableInstance from '../../util/draggableInstance/DraggableInstance';
import DraggableInstanceEvent from '../../util/draggableInstance/DraggableInstanceEvent';
import NativeEventListener from '../../util/event/NativeEventListener';
import ScrollBar from '../../component/ScrollBar/ScrollBar';
import { debounce } from 'lodash';

export default {
	name: 'TargetAudience',
	extends: AbstractBlockComponent,
	components: {
		ScrollBar,
	},
	props: {
		data: VueTypes.shape(TargetAudienceData).isRequired,
	},
	data() {
		return {
			width: 0,
			deviceState: this.$deviceState.currentState,
		};
	},
	computed: {
		showScrollBar() {
			return this.deviceState <= this.DeviceState.SMALL || this.data.devices.length > 3
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new TargetAudienceTransitionController(this);
			this.deviceStateListener = new NativeEventListener(
				this.$deviceState,
				DeviceStateEvent.STATE_UPDATE,
				event => {
					this.deviceState = event.data.state;
				},
			);
			this.setDeviceWidth();
			this.$nextTick(() => {
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
				this.handleResize()
			});
			this.isReady();
		},
		setDeviceWidth() {
			this.width = this.$refs.draggableContainer.offsetWidth / 3;
		},
		handleResize() {
			this.setDeviceWidth();
			console.log(this.draggableInstance.disabled);
			this.draggableInstance.setSnapPosition(
				this.$refs.draggableElement.offsetWidth / this.data.devices.length,
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
			this.scrollBarEndTimeout = setTimeout(() => this.draggableInstance.snapToNearestPoint(), 10);
		},
		getArticleData(article) {
			const clone = JSON.parse(JSON.stringify(article));

			// Add the required props
			return Object.assign(clone, {
				marginTop: 0,
				windowed: false,
				overlap: false,
			});
		},
	},
	beforeDestroy() {
		this.resizeListener.dispose();
		this.resizeListener = null;
		this.draggableInstance.dispose();
		this.draggableInstance = null;
		this.draggableCompleteListener.dispose();
		this.draggableCompleteListener = null;
	},
};
