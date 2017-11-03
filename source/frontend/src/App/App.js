import Vue from 'vue';
import { mapGetters } from 'vuex';
import { customButtonEventDispatcher, CustomButtonEvent } from 'vue-block-system';
import SlideoutPanelType from 'data/enum/SlideoutPanelType';
import SiteHeader from '../component/layout/SiteHeader/SiteHeader';
import SiteFooter from '../component/layout/SiteFooter/SiteFooter';
import Notification from '../component/Notification/Notification';
import PageLoader from '../component/PageLoader/PageLoader';
import backendLinkType from '../data/enum/BackendLinkType';
import NativeEventListener from '../util/event/NativeEventListener';
import VideoOverlay from '../component/VideoOverlay/VideoOverlay';
import SlideoutPanel from '../component/SlideoutPanel/SlideoutPanel';
import { AbstractRegistrableComponent } from 'vue-transition-component';
import SiteMenu from '../component/layout/SiteMenu';

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
		SiteMenu,
	},
	computed: {
		...mapGetters(
			{
				pageData: 'layout/pageData',
			},
		),
		hideContactButton() {
			return this.pageData ? this.pageData.hideContactButton : true;
		},
	},
	data() {
		return {
			pageLoaderReady: false,
			menuActive: false,
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
			const slideoutPanel = this.getChild('SlideoutPanel');
			switch (data.event) {
				case backendLinkType.CONTACT_US:
					slideOutPanel.transitionIn(SlideoutPanelType.CONTACT);
					break;
				case backendLinkType.CONTACT_KERNEL:
					slideoutPanel.transitionIn(SlideoutPanelType.CONTACT_KERNEL);
					break;
				default:
					// No default;
					break;
			}
		},
		handleStartAdvertisingClick() {
			this.getChild('SlideoutPanel').transitionIn(SlideoutPanelType.CONTACT);
		},
		handleToggleMenu() {
			this.menuActive = !this.menuActive;
		},
	},
	beforeDestroy() {
		this.customButtonEventListener.dispose();
		this.customButtonEventListener = null;
	},
};
