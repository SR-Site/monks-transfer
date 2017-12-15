import SlideoutPanelType from 'data/enum/SlideoutPanelType';
import { AbstractTransitionComponent } from 'vue-transition-component';
import { mapGetters } from 'vuex';
import UserService from '../../../../net/service/UserService';
import { NotificationMutationTypes } from '../../../../store/module/notification';
import PanelContactTransitionController from './PanelContactTransitionController';

export default {
	name: 'PanelContact',
	extends: AbstractTransitionComponent,
	data() {
		return {
			fieldData: [
				{
					name: 'firstname',
					localeKey: 'firstName',
					type: 'text',
					value: '',
					validationRules: 'required',
				},
				{
					name: 'lastname',
					localeKey: 'lastName',
					type: 'text',
					validationRules: 'required',
					value: '',
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
					validationRules: {
						required: true,
						regex: /^([0-9-]+)$/,
					},
					value: '',
				},
				{
					name: 'zipcode',
					localeKey: 'zipcode',
					type: 'text',
					validationRules: 'required',
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
		...mapGetters({
			contactOptionGetter: 'initData/contactOption',
			slideOutData: 'initData/slideOutData',
		}),
		submitLabel() {
			return this.slideOutData(SlideoutPanelType.CONTACT).submitLabel;
		},
		heading() {
			return this.slideOutData(SlideoutPanelType.CONTACT).heading;
		},
		subHeading() {
			return this.slideOutData(SlideoutPanelType.CONTACT).subHeading;
		},
		phoneNumber() {
			return this.contactOptionGetter('phone').phoneNumber || 'no-phone-number';
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PanelContactTransitionController(this);
			this.isReady();
		},
		handleSubmit() {
			this.$validator.validateAll().then(valid => {
				if (valid) {
					// Show the spinner
					this.$emit('showSpinner');
					// Submit the form
					UserService.contact(this.getFormData())
						.then(() =>
							this.$tracking.trackEvent({
								[this.TrackingProvider.GOOGLE_ANALYTICS]: {
									category: 'startAdvertising',
									actions: 'click',
									label: 'submitStartAdvertising',
								},
							}),
						)
						.then(() => this.$emit('hideSpinner'))
						.then(() => this.$parent.close())
						.then(() => this.resetForm())
						.then(() =>
							this.$store.dispatch(NotificationMutationTypes.SHOW, {
								type: this.NotificationTypes.ALERT,
								heading: this.$t('notification.alert.contact_success.heading'),
								paragraph: this.$t('notification.alert.contact_success.paragraph'),
							}),
						)
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
			this.fieldData.forEach(field => {
				data[field.name] = field.value;
			});
			return data;
		},
		handleInputChange(event, field) {
			field.value = event.target.value;
		},
		resetForm() {
			this.fieldData.forEach(field => {
				field.value = '';
			});
		},
	},
};
