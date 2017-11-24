import { DeviceStateEvent } from 'seng-device-state-tracker';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import ScrollUtil from 'util/ScrollUtil';
import { mapGetters } from 'vuex';
import NativeEventListener from '../../../util/event/NativeEventListener';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import Logo from '../../Logo/Logo';
import SiteHeaderTransitionController from './SiteHeaderTransitionController';

export default {
	name: 'SiteHeader',
	extends: AbstractTransitionComponent,
	props: {
		menuActive: VueTypes.bool.isRequired,
	},
	computed: {
		...mapGetters({
			pageData: 'layout/pageData',
			contactOptionGetter: 'initData/contactOption',
			landingRoute: 'init/landingRoute',
		}),
		solidHeader() {
			return this.isScrolled || this.breadcrumbs.length || this.isMedium || this.menuActive;
		},
		headerTheme() {
			return this.pageData ? this.pageData.headerTheme || this.Theme.LIGHT : this.Theme.LIGHT;
		},
		logoTheme() {
			return this.solidHeader ? this.Theme.DARK : this.headerTheme;
		},
		callToReachTheme() {
			return this.solidHeader ? this.Theme.DARK : this.headerTheme;
		},
		breadcrumbs() {
			return [].concat(this.pageData && this.pageData.breadcrumbs ? this.pageData.breadcrumbs : []);
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
		Breadcrumbs,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SiteHeaderTransitionController(this);
			this.isReady();
		},
		handleMenuClick() {
			this.$emit('toggleMenu');
		},
		handleScroll() {
			this.scrollTop = ScrollUtil.scrollTop();
		},
	},
	beforeDestroy() {
		this.scrollListener.dispose();
		this.scrollListener = null;

		this.deviceStateListener.dispose();
		this.deviceStateListener = null;
	},
};
