import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import NotificationTypes from '../../../../../data/enum/NotificationTypes';
import UserService from '../../../../../net/service/UserService';
import { NotificationMutationTypes } from '../../../../../store/module/notification';
import MarketMediaKitTransitionController from './MarketMediaKitTransitionController';

export default {
	name: 'MarketMediaKit',
	extends: AbstractTransitionComponent,
	props: {
		marketId: VueTypes.string.isRequired,
		data: VueTypes.shape({
			heading: VueTypes.string,
			label: VueTypes.string.isRequired,
			mediaKitPdf: VueTypes.string,
			mediaKitUrl: VueTypes.string,
		}),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketMediaKitTransitionController(this);
			this.getChild('ButtonQuaternary').transitionIn();
			this.isReady();
		},
		handleButtonClick() {
			this.$store
				.dispatch(NotificationMutationTypes.SHOW, {
					type: NotificationTypes.MEDIA_KIT_DOWNLOAD,
					heading: this.$t('notification.action.download_media_kit.heading'),
					paragraph: this.$t('notification.action.download_media_kit.paragraph'),
				})
				.then(result => {
					if (result.accept) {
						this.handleSubmit(result.data);
					}
				});
		},
		handleSubmit({ firstName, lastName, email }) {
			UserService.downloadMediaKit({
				firstName,
				lastName,
				email,
				marketId: this.marketId,
			})
				.then(({ data }) => {
					if (data.success) {
						this.handleSuccess();
					}
				})
				.catch(() => this.handleFailure());
		},
		handleSuccess() {
			this.$store.dispatch(NotificationMutationTypes.SHOW, {
				type: NotificationTypes.ALERT,
				heading: this.$t('notification.alert.download_media_kit.heading'),
				paragraph: this.$t('notification.alert.download_media_kit.paragraph'),
				mediaKitUrl: this.mediaKitUrl,
			});
			// Start download of the PDF
			if (this.mediaKitPdf) {
				window.open(this.mediaKitPdf, '_blank');
			};
		},
		handleFailure() {
			this.$store.dispatch(NotificationMutationTypes.SHOW, {
				type: NotificationTypes.ALERT,
				heading: this.$t('notification.alert.something_went_wrong.heading'),
				paragraph: this.$t('notification.alert.something_went_wrong.paragraph'),
			});
		},
	},
};
