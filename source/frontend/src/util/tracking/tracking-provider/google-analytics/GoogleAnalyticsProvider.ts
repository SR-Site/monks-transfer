import { Promise } from 'es6-promise';
import replace from 'lodash/replace'
import AbstractTrackingProvider from '../AbstractTrackingProvider';
import IGoogleAnalyticsProviderOptions from './IGoogleAnalyticsProviderOptions';
import { ITrackEventData, IPageViewData } from './IGoogleAnalyticsTrackingData';
import bows from 'bows';
import strip from 'strip';

export default class GoogleAnalyticsProvider extends AbstractTrackingProvider<IGoogleAnalyticsProviderOptions> {
	/**
	 * @description Namespace in which the google analytics is loaded
	 * @type {string}
	 * @private
	 */
	private static _NAMESPACE: string = 'ga';

	/**
	 * @protected
	 * @description The init method that initializes the google analytics library
	 */
	protected init(): void {
		this.logger = bows('GoogleAnalytics');

		((i, s, o, g, r, a, m) => {
			i['GoogleAnalyticsObject'] = r;
			(i[r] =
				i[r] ||
				function () {
					(i[r].q = i[r].q || []).push(arguments);
				}),
				(i[r].l = 1 * new Date().getTime());
			(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m);
			// Log the status
			this.logger(`Loaded`);
			// Notify about the API being ready
			this.providerReadyResolveMethod();
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', GoogleAnalyticsProvider._NAMESPACE);

		// Create the google analytics API with the correct trackingId
		window[GoogleAnalyticsProvider._NAMESPACE]('create', this.providerOptions.trackingId, 'auto');
	}

	/**
	 * @public
	 * @method trackEvent
	 * @description The method that actually triggers the tracking of the event
	 * @returns { Promise<void> }
	 */
	public trackEvent(data: ITrackEventData): Promise<void> {
		if (data.label !== void 0 && data.label !== null) {
			// Strip out all html tags
			data.label = strip(data.label);
			// Strip out all white space
			data.label = replace(data.label, ' ', '-');
		}

		return this.providerReady
		.then(() => {
			const ga = window[GoogleAnalyticsProvider._NAMESPACE];
			if (isNaN(data.value) && data.value) {
				ga('send', 'event', data.category, data.action, data.label, data.value);
			} else {
				if (data.label) {
					ga('send', 'event', data.category, data.action, data.label);
				} else {
					ga('send', 'event', data.category, data.action);
				}
			}
		})
		.then(() => this.logger(`trackEvent: ${JSON.stringify(data)}`));
	}

	/**
	 * @public
	 * @method trackPageView
	 * @description The method that actually triggers the tracking of the page view
	 * @returns { Promise<void> }
	 */
	public trackPageView(data: IPageViewData): Promise<void> {
		return this.providerReady
		.then(() => window[GoogleAnalyticsProvider._NAMESPACE]('send', 'pageview', data.page))
		.then(() => this.logger(`trackPageView: ${JSON.stringify(data)}`));
	}
}
