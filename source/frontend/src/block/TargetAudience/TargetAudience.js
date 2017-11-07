import { debounce } from 'lodash';
import { DeviceStateEvent } from 'seng-device-state-tracker';
import VueTypes from 'vue-types';
import ScrollBar from '../../component/ScrollBar/ScrollBar';
import AbstractScrollableBlock from '../../util/block/AbstractScrollableBlock';
import NativeEventListener from '../../util/event/NativeEventListener';
import TargetAudienceData from './TargetAudienceData';
import TargetAudienceTransitionController from './TargetAudienceTransitionController';

export default {
	name: 'TargetAudience',
	extends: AbstractScrollableBlock,
	components: {
		ScrollBar,
	},
	props: {
		data: VueTypes.shape(TargetAudienceData).isRequired,
	},
	data() {
		return {
			itemCount: this.data.devices.length,
			width: 0,
			deviceState: this.$deviceState.currentState,
		};
	},
	computed: {
		inViewPort() {
			return this.deviceState <= this.DeviceState.SMALL ? 1 : 3;
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new TargetAudienceTransitionController(this);
			this.setDeviceWidth();

			this.disposables.add(
				new NativeEventListener(this.$deviceState, DeviceStateEvent.STATE_UPDATE, this.handleDeviceStateChange)
			)

			this.disposables.add(
				new NativeEventListener(window, 'resize', debounce(this.setDeviceWidth, 100)),
			);

			this.$nextTick(() => this.setupScrollableBlock());
			this.isReady();
		},
		handleDeviceStateChange(event) {
			this.deviceState = event.data.state;
		},
		setDeviceWidth() {
			this.width = this.$refs.draggableContainer.offsetWidth / this.inViewPort;
		},
	},
};
