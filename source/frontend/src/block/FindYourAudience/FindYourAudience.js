import { DeviceStateEvent } from 'seng-device-state-tracker';
import Sticky from 'sticky-js';
import { AbstractBlockComponent } from 'vue-block-system';
import * as VueScrollTo from 'vue-scrollto/vue-scrollto';
import VueTypes from 'vue-types';
import NativeEventListener from '../../util/event/NativeEventListener';
import FindYourAudienceCategory from './FindYourAudienceCategory/FindYourAudienceCategory';
import FindYourAudienceData from './FindYourAudienceData';
import FindYourAudienceTransitionController from './FindYourAudienceTransitionController';

export default {
	name: 'FindYourAudience',
	extends: AbstractBlockComponent,
	components: {
		FindYourAudienceCategory,
	},
	props: {
		data: VueTypes.shape(FindYourAudienceData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new FindYourAudienceTransitionController(this);
			this.deviceStateListener = new NativeEventListener(
				this.$deviceState,
				DeviceStateEvent.STATE_UPDATE,
				event => this.handleDeviceStateChange(event.data.state),
			);
			this.handleDeviceStateChange(this.$deviceState.currentState);
			this.isReady();
		},
		handleDeviceStateChange(newState) {
			this.$nextTick(() => {
				if (newState > this.DeviceState.SMALL) {
					this.createSticky();
				} else {
					this.destroySticky();
				}
			});
		},
		scrollToComponent(componentId) {
			VueScrollTo.scrollTo(this.getChild(componentId).$el, 1000, {
				offset: -100,
				cancelable: true,
			});
		},
		destroySticky() {
			if (this.sticky) {
				this.sticky.destroy();
				this.sticky = null;
			}
		},
		createSticky() {
			if (!this.sticky) {
				this.sticky = new Sticky('.js-sticky', {
					marginTop: 125,
				});
			}
		},
	},
	beforeDestroy() {
		this.sticky.destroy();
		this.sticky = null;
	},
};
