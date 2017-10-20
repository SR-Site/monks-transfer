import { mapGetters } from 'vuex';
import { AbstractTransitionComponent } from 'vue-transition-component';
import SiteHeaderTransitionController from './SiteHeaderTransitionController';
import Logo from '../../Logo/Logo';
import { NotificationMutationTypes } from '../../../store/module/notification';

export default {
	name: 'SiteHeader',
	extends: AbstractTransitionComponent,
	computed: {
		...mapGetters(
			{
				contactOptionGetter: 'initData/contactOption',
			},
		),
		phoneNumber() {
			return this.contactOptionGetter('phone').phoneNumber || 'no-phone-number';
		},
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
	},
};
