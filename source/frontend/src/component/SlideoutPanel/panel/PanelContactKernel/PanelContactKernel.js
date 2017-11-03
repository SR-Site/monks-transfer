import { AbstractTransitionComponent } from 'vue-transition-component';
import { mapGetters } from 'vuex';
import UserService from '../../../../net/service/UserService';
import PanelContactKernelTransitionController from './PanelContactKernelTransitionController';
import { NotificationMutationTypes } from '../../../../store/module/notification';
import SlideoutPanelType from '../../../../data/enum/SlideoutPanelType';

export default {
	name: 'PanelContactKernel',
	extends: AbstractTransitionComponent,
	data() {
		return {
			fieldData: [
				{
					name: 'name',
					localeKey: 'name',
					type: 'text',
					value: '',
					validationRules: 'required',
				},
				{
					name: 'city',
					localeKey: 'city',
					type: 'text',
					value: '',
					validationRules: 'required',
				},
				{
					name: 'state',
					localeKey: 'state',
					type: 'text',
					value: '',
					validationRules: 'required',
				},
				{
					name: 'email',
					localeKey: 'email',
					type: 'email',
					validationRules: 'required|email',
					value: '',
				},
				{
					name: 'phone',
					localeKey: 'phone_number',
					type: 'tel',
					validationRules: 'required|numeric',
					value: '',
				},
				{
					name: 'comments',
					localeKey: 'comments',
					validationRules: 'required',
					value: '',
				},
			],
		};
	},
	computed: {
		...mapGetters(
			{
				contactOptionGetter: 'initData/contactOption',
				slideOutData: 'initData/slideOutData',
			},
		),
		submitLabel() {
			return this.slideOutData(SlideoutPanelType.CONTACT_KERNEL).submitLabel;
		},
		heading() {
			return this.slideOutData(SlideoutPanelType.CONTACT_KERNEL).heading;
		},
		subHeading() {
			return this.slideOutData(SlideoutPanelType.CONTACT_KERNEL).subHeading;
		},
		phoneNumber() {
			return this.contactOptionGetter('phone').phoneNumber || 'no-phone-number';
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PanelContactKernelTransitionController(this);
			this.isReady();
		},
		handleSubmit() {
			this.$validator.validateAll()
			.then((valid) => {
				if (valid) {
					// Show the spinner
					this.$emit('showSpinner');
					// Submit the form
					UserService.contactKernel(this.getFormData())
					.then(() => this.$tracking.trackEvent(
						{
							[this.TrackingProvider.GOOGLE_ANALYTICS]: {
								category: 'startAdvertising',
								actions: 'click',
								label: 'submitStartAdvertising',
							},
						},
					))
					.then(() => this.$emit('hideSpinner'))
					.then(() => this.$parent.close())
					.then(() => this.resetForm())
					.then(() => this.$store.dispatch(NotificationMutationTypes.SHOW, {
						type: this.NotificationTypes.ALERT,
						heading: this.$t('notification.alert.contact_success.heading'),
						paragraph: this.$t('notification.alert.contact_success.paragraph'),
					}))
					.catch(result => {
						this.$emit('hideSpinner');
						this.$store.dispatch(
							NotificationMutationTypes.SHOW_SERVER_ERROR,
							result.error ? result.error.code : '',
						);
					});
				}
			});
		},
		getFormData() {
			const data = {};
			this.fieldData.forEach(field => data[field.name] = field.value);
			return data;
		},
		handleInputChange(event, field) {
			field.value = event.target.value;
		},
		resetForm() {
			this.fieldData.forEach(field => field.value = '');
		},
	},
};
