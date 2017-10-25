import { Promise } from 'es6-promise';
import AbstractTrackingProvider from '../AbstractTrackingProvider';
import ITwitterTrackingPixelProviderOptions from './ITwitterTrackingPixelProviderOptions';
import bows from 'bows';
import { ITrackEventData } from './ITwitterTrackingPixelTrackingData';

export default class TwitterTrackingPixelProvider extends AbstractTrackingProvider<
	ITwitterTrackingPixelProviderOptions
> {
	/**
	 * @description Namespace in which the google tag manager is loaded
	 * @type {string}
	 * @private
	 */
	private static _NAMESPACE: string = 'twq';

	/**
	 * @protected
	 * @description The init method that initializes the google analytics library
	 */
	protected init(): void {
		this.logger = bows('TwitterTrackingPixel');

		!(function(e, t, n, s, u, a) {
			e[TwitterTrackingPixelProvider._NAMESPACE] ||
				((s = e[TwitterTrackingPixelProvider._NAMESPACE] = () => {
					s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
				}),
				(s.version = '1.1'),
				(s.queue = []),
				(u = t.createElement(n)),
				(u.async = !0),
				(u.src = '//static.ads-twitter.com/uwt.js'),
				(a = t.getElementsByTagName(n)[0]),
				a.parentNode.insertBefore(u, a));
		})(window, document, 'script');

		window[TwitterTrackingPixelProvider._NAMESPACE]('init', this.providerOptions.trackingPixelId);
		// Log the status
		this.logger(`Loaded`);
		// Notify about the API being ready
		this.providerReadyResolveMethod();
	}

	/**
	 * @public
	 * @method trackEvent
	 * @description The method that actually triggers the tracking of the event
	 * @returns { Promise<void> }
	 */
	public trackEvent(data: ITrackEventData): Promise<void> {
		return this.providerReady
			.then(() => window[TwitterTrackingPixelProvider._NAMESPACE]('track', data.event, data.parameters))
			.then(() => this.logger(`trackEvent: ${JSON.stringify(data)}`));
	}

	/**
	 * @public
	 * @method trackPageView
	 * @description The method that actually triggers the tracking of the page view
	 * @returns { Promise<void> }
	 */
	public trackPageView(): Promise<void> {
		return this.providerReady
			.then(() => window[TwitterTrackingPixelProvider._NAMESPACE]('track', 'PageView'))
			.then(() => this.logger(`trackPageView`));
	}
}
