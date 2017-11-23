import { AbstractTransitionComponent } from 'vue-transition-component';
import { mapGetters } from 'vuex';
import SiteFooterTransitionController from './SiteFooterTransitionController';
import Logo from '../../Logo/Logo';

export default {
	name: 'SiteFooter',
	extends: AbstractTransitionComponent,
	components: {
		Logo,
	},
	computed: {
		...mapGetters({
			contactOptionGetter: 'initData/contactOption',
			footerData: 'initData/footerData',
		}),
		phoneNumber() {
			return this.contactOptionGetter('phone').phoneNumber || 'no-phone-number';
		},
		email() {
			return this.contactOptionGetter('email') || {};
		},
		mailTo() {
			return `mailto:${this.email.emailAddress}?subject=${this.email.emailSubject}&body=${this.email.emailBody}`;
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SiteFooterTransitionController(this);
			this.isReady();
		},
	},
};
