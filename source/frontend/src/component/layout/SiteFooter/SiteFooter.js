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
		...mapGetters(
			{
				contactOptionGetter: 'initData/contactOption',
			},
		),
		phoneNumber() {
			return this.contactOptionGetter('phone').phoneNumber || 'no-phone-number';
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SiteFooterTransitionController(this);
			this.isReady();
		},
	},
};
