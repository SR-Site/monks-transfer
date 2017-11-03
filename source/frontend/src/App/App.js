import Vue from 'vue';
import { debounce } from 'lodash';
import { mapGetters } from 'vuex';
import { customButtonEventDispatcher, CustomButtonEvent } from 'vue-block-system';
import SlideoutPanelType from 'data/enum/SlideoutPanelType';
import SiteHeader from '../component/layout/SiteHeader/SiteHeader';
import SiteFooter from '../component/layout/SiteFooter/SiteFooter';
import Notification from '../component/Notification/Notification';
import PageLoader from '../component/PageLoader/PageLoader';
import NativeEventListener from '../util/event/NativeEventListener';
import VideoOverlay from '../component/VideoOverlay/VideoOverlay';
import SlideoutPanel from '../component/SlideoutPanel/SlideoutPanel';
import { AbstractRegistrableComponent } from 'vue-transition-component';
import SiteMenu from '../component/layout/SiteMenu';
import BackendLinkType from '../data/enum/link/BackendLinkType';

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

		this.scrollListener = new NativeEventListener(
			window,
			'scroll',
			debounce(this.handleScroll, 50),
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
				case BackendLinkType.CONTACT_US:
					slideOutPanel.transitionIn(SlideoutPanelType.CONTACT);
					break;
				case BackendLinkType.CONTACT_KERNEL:
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
		handleScroll() {
			this.menuActive = false;
		},
	},
	beforeDestroy() {
		this.customButtonEventListener.dispose();
		this.customButtonEventListener = null;
		this.scrollListener.dispose();
		this.scrollListener = null;
	},
};
