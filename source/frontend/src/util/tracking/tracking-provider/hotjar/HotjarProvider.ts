import bows from 'bows';
import { Promise } from 'es6-promise';
import AbstractTrackingProvider from '../AbstractTrackingProvider';
import IHotjarProviderOptions from './IHotjarProviderOptions';

export default class HotjarProvider extends AbstractTrackingProvider<IHotjarProviderOptions> {
	/**
	 * @description Namespace in which the google tag manager is loaded
	 * @type {string}
	 * @private
	 */
	private static _NAMESPACE: string = 'hj';

	/**
	 * @protected
	 * @description The init method that initializes the google analytics library
	 */
	protected init(): void {
		this.logger = bows('Hotjar');

		((h, o, t, j, a, r) => {
			h[HotjarProvider._NAMESPACE] =
				h[HotjarProvider._NAMESPACE] ||
				function() {
					(h[HotjarProvider._NAMESPACE].q = h[HotjarProvider._NAMESPACE]['q'] || []).push(arguments);
				};
			h['_hjSettings'] = {
				hjid: this.providerOptions.trackingId,
				hjsv: 5,
			};
			a = o.getElementsByTagName('head')[0];
			r = o.createElement('script');
			r.async = 1;
			r.src = t + h['_hjSettings']['hjid'] + j + h['_hjSettings']['hjsv'];
			r.onload = () => {
				// Log the status
				this.logger(`Loaded`);
				// Notify about the API being ready
				this.providerReadyResolveMethod();
			};
			a.appendChild(r);
		})(window, document, '//static.hotjar.com/c/hotjar-', '.js?sv=');
	}

	/**
	 * @public
	 * @method trackEvent
	 * @description The method that actually triggers the tracking of the event
	 * @returns { Promise<void> }
	 */
	public trackEvent(): Promise<void> {
		// No event tracking for hotjar
		return this.providerReady.then(() => Promise.resolve());
	}

	/**
	 * @public
	 * @method trackPageView
	 * @description The method that actually triggers the tracking of the page view
	 * @returns { Promise<void> }
	 */
	public trackPageView(): Promise<void> {
		// No page tracking for hotjar
		return this.providerReady.then(() => Promise.resolve());
	}
}
