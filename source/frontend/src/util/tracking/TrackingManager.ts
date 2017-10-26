import Disposable from 'seng-disposable';
import { assign } from 'lodash';
import ITrackingManagerOptions from './interface/ITrackingManagerOptions';
import AbstractTrackingProvider from './tracking-provider/AbstractTrackingProvider';
import IAbstractTrackingProviderOptions from './tracking-provider/IAbstractTrackingProviderOptions';
import IAbstractTrackPageViewData from './tracking-provider/IAbstractTrackPageViewData';

/**
 * @class TrackingManager
 * @description This class is used to wrap all the tracking providers so you can easily add multiple analytics
 * providers to your site. Use the addProvider method add them while constructing this class.
 *
 * All tracking providers log the events with bows (https://www.npmjs.com/package/bows), to view the logs you have
 * to update your local storage by running this in the console:
 *
 * ```console
 * localStorage.debug = true
 * ```
 *
 * To disable the logs run the following in your console
 *
 * ```console
 * delete localStorage.debug
 * ```
 *
 * Example usage:
 * ```typescript
 * const trackingManager = new TrackingManager({
 *      providers: {
 *          ga: new GoogleAnalyticsTrackingProvider({
 *              trackingId: 'UA-XXXXXXX',
 *          }),
 *          fbq: new FacebookTrackingPixelProvider({
 *              trackingPixelId: 'XXXXXXXXXX',
 *          }),
 *      }
 * });
 *
 * trackingManager.trackEvent({
 *      ga: {
 *          label: 'Purchase',
 *          category: 'shop'
 *      },
 *      fbq: {
 *          event: 'Purchase',
 *      },
 * });
 * ```
 *
 */
export default class TrackingManager extends Disposable {
	private _options: ITrackingManagerOptions;
	private _providers: {
		[id: string]: AbstractTrackingProvider<IAbstractTrackingProviderOptions>;
	} = {};

	constructor(options: ITrackingManagerOptions) {
		super();

		// Store the provided options
		this._options = assign({}, options);

		// Add the providers that were provided when creating the tracking manager
		Object.keys(this._options.providers || {}).forEach((id: string) => this.addProvider(id, this._options.providers[id]));
	}

	/**
	 * @public
	 * @method addProvider
	 * @param {string} id
	 * @param {AbstractTrackingProvider<IAbstractTrackingProviderOptions>} provider
	 * @description Add an extra provider to the providers object
	 */
	public addProvider(id: string, provider: AbstractTrackingProvider<IAbstractTrackingProviderOptions>): void {
		this._providers[id] = provider;
	}

	/**
	 * @public
	 * @method removeProvider
	 * @param {string} id
	 * @description Remove a provider from the providers object
	 */
	public removeProvider(id: string): void {
		delete this._providers[id];
	}

	/**
	 * @public
	 * @method trackEvent
	 * @param {{[p: string]: IAbstractTrackPageViewData}} data
	 * @description Loop through all the providers and trigger an event
	 */
	public trackEvent(data: { [provider: string]: IAbstractTrackPageViewData }): void {
		Object.keys(data).forEach(id => this._providers[id].trackEvent(data[id]));
	}

	/**
	 * @public
	 * @method trackPageView
	 * @description Loop through all the providers and trigger a page view
	 */
	public trackPageView(data: { [provider: string]: IAbstractTrackPageViewData }): void {
		Object.keys(data).forEach((id: string) => this._providers[id].trackPageView(data[id]));
	}

	/**
	 * @public
	 * @method dispose
	 */
	public dispose(): void {
		// Dispose all the added providers as well
		Object.keys(this._providers).forEach(key => this._providers[key].dispose());

		this._providers = null;
		this._options = null;

		super.dispose();
	}
}
