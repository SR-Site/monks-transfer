import { mapGetters } from 'vuex';
import { debounce } from 'lodash';
import { AbstractTransitionComponent } from 'vue-transition-component';
import SiteHeaderTransitionController from './SiteHeaderTransitionController';
import Logo from '../../Logo/Logo';
import { NotificationMutationTypes } from '../../../store/module/notification';
import NativeEventListener from '../../../util/event/NativeEventListener';

export default {
	name: 'SiteHeader',
	extends: AbstractTransitionComponent,
	computed: {
		...mapGetters({
			contactOptionGetter: 'initData/contactOption',
		}),
		scrolled() {
			return this.scrollTop > this.scrollOffset;
		},
		phoneNumber() {
			return this.contactOptionGetter('phone').phoneNumber || 'no-phone-number';
		},
	},
	data() {
		return {
			scrollTop: 0,
			scrollOffset: 0,
		};
	},
	mounted() {
		this.scrollOffset = this.$el.offsetHeight;
		this.scrollListener = new NativeEventListener(window, 'scroll', debounce(this.handleScroll, 100));
		this.handleScroll();
	},
	components: {
		Logo,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SiteHeaderTransitionController(this);
			this.isReady();
		},
		handleMenuClick() {
			this.$store.dispatch(NotificationMutationTypes.SHOW, {
				type: this.NotificationTypes.ALERT,
				heading: 'Oops',
				paragraph: 'Open the menu',
			});
			console.log('menu clicked');
		},
		handleScroll() {
			this.scrollTop = document.documentElement.scrollTop;
		},
	},
	beforeDestroy() {
		this.scrollListener.dispose();
		this.scrollListener = null;
	},
};
