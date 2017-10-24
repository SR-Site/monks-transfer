import Vue from 'vue';
import { DeviceStateEvent } from 'seng-device-state-tracker';
import SiteHeader from '../component/layout/SiteHeader/SiteHeader';
import SiteFooter from '../component/layout/SiteFooter/SiteFooter';
import Notification from '../component/Notification/Notification';
import PageLoader from '../component/PageLoader/PageLoader';

export default {
	name: 'App',
	components: {
		PageLoader,
		SiteHeader,
		SiteFooter,
		Notification,
	},
	data() {
		return {
			pageLoaderReady: false,
		};
	},
	mounted() {
		this.$deviceState.addEventListener(DeviceStateEvent.STATE_UPDATE, event => {
			console.log(event);
		});
	},
	methods: {
		handlePageLoaderReady(component) {
			// Attach the pre-loader to all vue components
			Vue.prototype['pageLoader'] = component;
			// Show the page loader when it's ready
			component.transitionIn().then(() => {
				this.pageLoaderReady = true;
			});
		},
	},
};
