import Vue from 'vue';
import { mapGetters } from 'vuex';
import { customButtonEventDispatcher, CustomButtonEvent } from 'vue-block-system';
import SiteHeader from '../component/layout/SiteHeader/SiteHeader';
import SiteFooter from '../component/layout/SiteFooter/SiteFooter';
import Notification from '../component/Notification/Notification';
import PageLoader from '../component/PageLoader/PageLoader';
import backendLinkType from '../data/enum/BackendLinkType';
import NativeEventListener from '../util/event/NativeEventListener';
import VideoOverlay from '../component/VideoOverlay/VideoOverlay';
import SlideoutPanel from '../component/SlideoutPanel/SlideoutPanel';
import { AbstractRegistrableComponent } from 'vue-transition-component';

export default {
	name: 'App',
	extends: AbstractRegistrableComponent,
	components: {
		PageLoader,
		SiteHeader,
		SiteFooter,
		VideoOverlay,
		Notification,
		SlideoutPanel,
	},
	computed: {
		...mapGetters(
			{
				pageData: 'layout/pageData',
			},
		),
		hideContactButton() {
			return this.pageData.hideContactButton;
		},
	},
	data() {
		return {
			pageLoaderReady: false,
		};
	},
	mounted() {
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
					this.getChild('SlideoutPanel').transitionIn(SlideoutPanel.CONTACT);
					break;
				default:
					// No default;
					break;
			}
		},
		handleStartAdvertisingClick() {
			this.getChild('SlideoutPanel').transitionIn(SlideoutPanel.CONTACT);
		},
	},
	beforeDestroy() {
		this.customButtonEventListener.dispose();
		this.customButtonEventListener = null;
	},
};
