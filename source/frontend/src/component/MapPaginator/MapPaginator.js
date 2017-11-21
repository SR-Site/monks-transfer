import padStart from 'lodash/padStart';
import { DeviceStateEvent } from 'seng-device-state-tracker';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import NativeEventListener from '../../util/event/NativeEventListener';
import MapPaginatorTransitionController from './MapPaginatorTransitionController';

export default {
	name: 'MapPaginator',
	extends: AbstractTransitionComponent,
	props: {
		items: VueTypes.arrayOf(VueTypes.any),
		activeIndex: VueTypes.number.isRequired,
	},
	data() {
		return {
			enabled: true,
			deviceState: this.$deviceState.currentState,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MapPaginatorTransitionController(this);
			this.deviceStateListener = new NativeEventListener(
				this.$deviceState,
				DeviceStateEvent.STATE_UPDATE,
				event => {
					this.deviceState = event.data.state;
				},
			);
			this.isReady();
		},
		enableInteraction() {
			this.enabled = true;
		},
		disableInteraction() {
			this.enabled = false;
		},
		padStart(value) {
			return padStart(value.toString(), 2, '0');
		},
		handlePaginatorClick(index) {
			if (this.enabled) {
				this.$emit('paginatorClick', index);
			}
		},
		handlePreviousClick() {
			if (this.enabled && this.activeIndex - 1 >= 0) {
				this.$emit('paginatorClick', this.activeIndex - 1);
			}
		},
		handleNextClick() {
			if (this.enabled && this.activeIndex + 1 < this.items.length) {
				this.$emit('paginatorClick', this.activeIndex + 1);
			}
		},
	},
};
