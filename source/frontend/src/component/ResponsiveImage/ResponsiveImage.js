import { DeviceStateEvent } from 'seng-device-state-tracker';
import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

export default {
	name: 'ResponsiveImage',
	props: {
		image: VueTypes.shape(PropImage),
	},
	mounted() {
		this.$deviceState.addEventListener(DeviceStateEvent.STATE_UPDATE, this.handleDeviceStateChange);
	},
	data() {
		return {
			deviceState: this.$deviceState.currentState,
		};
	},
	computed: {
		src() {
			return this.deviceState > this.DeviceState.SMALL ? this.image.normal : this.image.small;
		},
	},
	methods: {
		handleDeviceStateChange(event) {
			this.deviceState = event.data.state;
		},
	},
};
