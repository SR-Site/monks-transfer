import { DeviceStateEvent } from 'seng-device-state-tracker';
import Sticky from 'sticky-js';
import { AbstractBlockComponent } from 'vue-block-system';
import * as VueScrollTo from 'vue-scrollto/vue-scrollto';
import VueTypes from 'vue-types';
import NativeEventListener from '../../util/event/NativeEventListener';
import FindYourAudienceCategory from './FindYourAudienceCategory/FindYourAudienceCategory';
import FindYourAudienceData from './FindYourAudienceData';
import FindYourAudienceTransitionController from './FindYourAudienceTransitionController';

// The sticky-js lib does not allow for element and requires a selector, this will cause issues when we have
// multiple sticky classes in the page, so add a name space if needed
const STICKY_CLASS = `.js-sticky`;

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
		scrollToElement(element) {
			VueScrollTo.scrollTo(element, 1000, {
				offset: -100,
				cancelable: true,
			});
		},
		scrollToComponent(componentId) {
			this.scrollToElement(this.getChild(componentId).$el);
		},
		handleBackToTop() {
			this.scrollToElement(this.$el);
		},
		destroySticky() {
			if (this.sticky) {
				this.sticky.destroy();
				this.sticky = null;
				this.$el.querySelector(STICKY_CLASS).removeAttribute('style');
			}
		},
		createSticky() {
			if (!this.sticky) {
				this.sticky = new Sticky(STICKY_CLASS, {
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
