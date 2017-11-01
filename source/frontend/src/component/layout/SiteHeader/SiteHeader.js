import { mapGetters } from 'vuex';
import { DeviceStateEvent } from 'seng-device-state-tracker';
import { AbstractTransitionComponent } from 'vue-transition-component';
import SiteHeaderTransitionController from './SiteHeaderTransitionController';
import Logo from '../../Logo/Logo';
import { NotificationMutationTypes } from '../../../store/module/notification';
import NativeEventListener from '../../../util/event/NativeEventListener';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';

export default {
	name: 'SiteHeader',
	extends: AbstractTransitionComponent,
	computed: {
		...mapGetters(
			{
				pageData: 'layout/pageData',
				contactOptionGetter: 'initData/contactOption',
				landingRoute: 'init/landingRoute',
			},
		),
		headerTheme() {
			return this.pageData ? (this.pageData.headerTheme || this.Theme.LIGHT) : this.Theme.LIGHT;
		},
		breadcrumbs() {
			return this.pageData && this.pageData.breadcrumbs ? this.pageData.breadcrumbs : [];
		},
		phoneNumber() {
			return this.contactOptionGetter('phone').phoneNumber || 'no-phone-number';
		},
		isScrolled() {
			return this.scrollTop > this.scrollOffset;
		},
		isMedium() {
			return this.deviceState <= this.DeviceState.MEDIUM;
		},
	},
	data() {
		return {
			deviceState: this.$deviceState.currentState,
			scrollTop: 0,
			scrollOffset: 0,
		};
	},
	mounted() {
		this.scrollOffset = this.$el.offsetHeight / 2;
		this.scrollListener = new NativeEventListener(window, 'scroll', this.handleScroll);
		this.deviceStateListener = new NativeEventListener(this.$deviceState, DeviceStateEvent.STATE_UPDATE, event => {
			this.deviceState = event.data.state;
		});
		this.handleScroll();
	},
	components: {
		Logo,
		Breadcrumbs
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SiteHeaderTransitionController(this);
			this.isReady();
		},
		handleMenuClick() {
			this.$store.dispatch(NotificationMutationTypes.SHOW, {
				type: this.NotificationTypes.ALERT,
				heading: 'TODO:',
				paragraph: 'Open the menu',
			});
		},
		handleScroll() {
			this.scrollTop = document.documentElement.scrollTop;
		},
	},
	beforeDestroy() {
		this.scrollListener.dispose();
		this.scrollListener = null;

		this.deviceStateListener.dispose();
		this.deviceStateListener = null;
	},
};
