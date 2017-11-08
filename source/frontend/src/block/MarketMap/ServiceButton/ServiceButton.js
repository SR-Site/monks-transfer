import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import { mapGetters } from 'vuex';
import ServiceButtonTransitionController from './ServiceButtonTransitionController';

export default {
	name: 'ServiceButton',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.any.isRequired,
	},
	computed: {
		...mapGetters(
			{
				contactOptionGetter: 'initData/contactOption',
			},
		),
		emailAddress() {
			return this.contactOptionGetter('email').emailAddress || 'no-phone-number';
		},
		phoneNumber() {
			return this.contactOptionGetter('phone').phoneNumber || 'no-phone-number';
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ServiceButtonTransitionController(this);
			this.isReady();
		},
		handleClick() {
			this.$emit('click');
		},
	},
};
