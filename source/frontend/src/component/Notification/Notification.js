import keyCode from 'key-code';
import { AbstractTransitionComponent, TransitionEvent } from 'vue-transition-component';
import { mapState } from 'vuex';
import NotificationTypes from '../../data/enum/NotificationTypes';
import NativeEventListener from '../../util/event/NativeEventListener';
import NotificationTransitionController from './NotificationTransitionController';

export default {
	name: 'Notification',
	extends: AbstractTransitionComponent,
	created() {
		this.notificationTypes = NotificationTypes;
	},
	computed: {
		okLabel() {
			return this.ok !== undefined ? this.ok : this.$t('global.notification.cta.okLabel');
		},
		yesLabel() {
			return this.yes !== undefined ? this.yes : this.$t('global.notification.cta.yesLabel');
		},
		noLabel() {
			return this.no !== undefined ? this.no : this.$t('global.notification.cta.noLabel');
		},
		sendLabel() {
			return this.send !== undefined ? this.send : this.$t('global.notification.cta.sendLabel');
		},
		...mapState('notification', [
			'isActive',
			'type',
			'icon',
			'heading',
			'paragraph',
			'yes',
			'no',
			'ok',
			'send',
			'resolve',
		]),
	},
	data() {
		return {
			downloadFields: [
				{
					name: 'name',
					localeKey: 'name',
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
			],
		};
	},
	watch: {
		isActive(value) {
			if (value) {
				// Crete a listener for closing the popup with the escape key
				this.keyDownEventListener = new NativeEventListener(document, 'keyup', this.handleKeyUp.bind(this));
				this.transitionIn();
			}
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new NotificationTransitionController(this);
			this.transitionController.addEventListener(TransitionEvent.TRANSITION_OUT_START, () => {
				this.keyDownEventListener.dispose();
				this.keyDownEventListener = null;
			});
			this.isReady();
		},
		accept() {
			return this.transitionOut().then(this.resolve.bind(this, { accept: true }));
		},
		decline() {
			return this.transitionOut().then(
				this.resolve.bind(this, {
					accept: false,
				}),
			);
		},
		submit() {
			console.log('submit');
			this.$validator.validateAll().then(valid => {
				if (valid) {
					return this.transitionOut()
						.then(this.resolve.bind(this, { accept: true, data: this.getFormData() }))
						.then(() => this.resetForm());
				}
				return null;
			});
		},
		handleKeyUp(event) {
			if (this.isActive && event.keyCode === keyCode.ESC) {
				this.decline();
			}
		},
		getFormData() {
			const data = {};
			this.downloadFields.forEach(field => {
				data[field.name] = field.value;
			});
			return data;
		},
		handleInputChange(event, field) {
			field.value = event.target.value;
		},
		resetForm() {
			this.downloadFields.forEach(field => {
				field.value = '';
			});
		},
	},
	beforeDestroy() {
		this.clipboard.destroy();
		this.clipboard = null;
	},
};
