import objectFitImages from 'object-fit-images';
import TrackingProvider from 'util/tracking/TrackingProvider';
import { AbstractContentPageComponent } from 'vue-block-system';
import ContentPageTransitionController from './ContentPageTransitionController';

export default {
	name: 'ContentPage',
	extends: AbstractContentPageComponent,
	methods: {
		handleRouteChangeComplete() {
			console.log('route change complete');
			this.pageLoader.transitionOut();
			this.$nextTick(() => {
				objectFitImages(); // Polyfill the object-fit to make sure it works on IE
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
		if (to.path === from.path && from.hash !== to.hash) {
			next();
		} else {
			this.$emit('beforePageChange');
			this.pageLoader.transitionIn().then(() => next());
		}
	},
};
