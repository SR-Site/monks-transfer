import { Promise } from 'es6-promise';
import AbstractTrackingProvider from '../AbstractTrackingProvider';
import IFacebookTrackingPixelProviderOptions from './IFacebookTrackingPixelProviderOptions';
import bows from 'bows';
import { ITrackEventData } from 'util/tracking/tracking-provider/facebook-tracking-pixel/IFacebookTrackingPixelTrackingData';

export default class FacebookTrackingPixelProvider extends AbstractTrackingProvider<IFacebookTrackingPixelProviderOptions> {
	/**
	 * @description Namespace in which the google tag manager is loaded
	 * @type {string}
	 * @private
	 */
	private static _NAMESPACE: string = 'fbq';

	/**
	 * @protected
	 * @description The init method that initializes the google analytics library
	 */
	protected init(): void {
		this.logger = bows('FacebookTrackingPixel');

		let n;

		n = window[FacebookTrackingPixelProvider._NAMESPACE] = function () {
			n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
		};

		if (!window[FacebookTrackingPixelProvider._NAMESPACE]) {
			window[FacebookTrackingPixelProvider._NAMESPACE] = n;
		}

		n.push = n;
		n.loaded = !0;
		n.version = '2.0';
		n.queue = [];
		const t = document.createElement('script');
		t.async = !0;
		t.src = 'https://connect.facebook.net/en_US/fbevents.js';
		const s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(t, s);

		window[FacebookTrackingPixelProvider._NAMESPACE]('init', this.providerOptions.trackingPixelId);
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
			.then(() => window[FacebookTrackingPixelProvider._NAMESPACE]('track', data.event, data.parameters))
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
			.then(() => window[FacebookTrackingPixelProvider._NAMESPACE]('track', 'PageView'))
			.then(() => this.logger(`trackPageView`));
	}
}
