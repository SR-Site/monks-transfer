import { AbstractContentPageComponent } from 'vue-block-system';
import TrackingProvider from 'util/tracking/TrackingProvider';
import ContentPageTransitionController from './ContentPageTransitionController';

export default {
	name: 'ContentPage',
	extends: AbstractContentPageComponent,
	methods: {
		handleRouteChangeComplete() {
			this.pageLoader.transitionOut();
			this.$nextTick(() => {
				this.$tracking.trackPageView({
					[TrackingProvider.GOOGLE_ANALYTICS]: {
						page: this.$router.currentRoute.path,
					},
					[TrackingProvider.TWITTER_PIXEL]: {},
					[TrackingProvider.FACEBOOK_PIXEL]: {},
				});
			});
		},
		handleAllComponentsReady() {
			this.transitionController = new ContentPageTransitionController(this);
			this.isReady();
		},
		getBlockClassNames(blockData) {
			const classNames = ['block-component'];

			if (blockData.windowed) {
				classNames.push('is-windowed');
			}

			if (blockData.overlap) {
				classNames.push('overlap');
			}

			if (blockData.marginTop) {
				classNames.push(`margin-top-${blockData.marginTop}`);
			}

			return classNames.join(' ');
		},
	},
	beforeRouteUpdate(to, from, next) {
		this.$emit('beforePageChange');
		this.pageLoader.transitionIn().then(() => next());
	},
};
