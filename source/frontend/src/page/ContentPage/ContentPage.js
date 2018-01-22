import objectFitImages from 'object-fit-images';
import ScrollUtil from 'util/ScrollUtil';
import TrackingProvider from 'util/tracking/TrackingProvider';
import { AbstractContentPageComponent } from 'vue-block-system';
import ContentPageTransitionController from './ContentPageTransitionController';

export default {
	name: 'ContentPage',
	extends: AbstractContentPageComponent,
	methods: {
		handleRouteChangeComplete() {
			this.pageLoader.transitionOut();
			this.$nextTick(() => {
				if (window.location.hash.slice(1).length === 0) {
					ScrollUtil.scrollElement().scrollTop = 0;
				}
				objectFitImages(); // Polyfill the object-fit to make sure it works on IE
				this.$tracking.trackPageView({
					[TrackingProvider.GOOGLE_ANALYTICS]: {
						page: this.$router.currentRoute.path,
					},
					[TrackingProvider.TWITTER_PIXEL]: {},
					[TrackingProvider.FACEBOOK_PIXEL]: {},
					[TrackingProvider.FACEBOOK_PIXEL_2]: {},
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
