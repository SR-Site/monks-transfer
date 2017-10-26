import Vue from 'vue';
import { customButtonEventDispatcher, CustomButtonEvent } from 'vue-block-system';
import { DeviceStateEvent } from 'seng-device-state-tracker';
import SiteHeader from '../component/layout/SiteHeader/SiteHeader';
import SiteFooter from '../component/layout/SiteFooter/SiteFooter';
import Notification from '../component/Notification/Notification';
import PageLoader from '../component/PageLoader/PageLoader';
import backendLinkType from '../data/enum/BackendLinkType';
import { NotificationMutationTypes } from '../store/module/notification';
import NativeEventListener from '../util/event/NativeEventListener';
import VideoOverlay from '../component/VideoOverlay/VideoOverlay';

export default {
	name: 'App',
	components: {
		PageLoader,
		SiteHeader,
		SiteFooter,
		VideoOverlay,
		Notification,
	},
	data() {
		return {
			pageLoaderReady: false,
		};
	},
	mounted() {
		// this.$deviceState.addEventListener(DeviceStateEvent.STATE_UPDATE, event => {
		// 	console.log(event);
		// });

		this.customButtonEventListener = new NativeEventListener(
			customButtonEventDispatcher,
			CustomButtonEvent.FIRE,
			event => this.handleCustomButtonEvent(event.data),
		);
	},
	methods: {
		handlePageLoaderReady(component) {
			// Attach the pre-loader to all vue components
			Vue.prototype.pageLoader = component;
			// Show the page loader when it's ready
			component.transitionIn().then(() => {
				this.pageLoaderReady = true;
			});
		},
		handleCustomButtonEvent(data) {
			switch (data.event) {
				case backendLinkType.CONTACT_US:
					this.$store.dispatch(NotificationMutationTypes.SHOW, {
						type: this.NotificationTypes.ALERT,
						heading: 'TODO',
						paragraph: 'OPEN THE CONTACT PANEL',
					});
					break;
				default:
					// No default;
					break;
			}
		},
		handleStartAdvertisingClick() {
			this.$store.dispatch(NotificationMutationTypes.SHOW, {
				type: this.NotificationTypes.ALERT,
				heading: 'TODO',
				paragraph: 'OPEN THE CONTACT PANEL',
			});
		},
	},
	beforeDestroy() {
		this.customButtonEventListener.dispose();
		this.customButtonEventListener = null;
	},
};
