import bows from 'bows';
import { Promise } from 'es6-promise';
import AbstractTrackingProvider from '../AbstractTrackingProvider';
import IForensicsProviderOptions from './IForensicsProviderOptions';
import LoadScriptTask from 'util/preloading/task/LoadScriptTask';

export default class ForensicsProvider extends AbstractTrackingProvider<IForensicsProviderOptions> {
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
		this.logger = bows('Forensics');

		const loadScriptTask = new LoadScriptTask({
			assets: `https://secure.leadforensics.com/js/${this.providerOptions.trackingId}.js`,
			cached: false,
		});

		loadScriptTask.load(() => {
			// Clean the task
			loadScriptTask.dispose();
			// Log the status
			this.logger(`Loaded`);
			// Notify about the API being ready
			this.providerReadyResolveMethod();
		});
	}

	/**
	 * @public
	 * @method trackEvent
	 * @description The method that actually triggers the tracking of the event
	 * @returns { Promise<void> }
	 */
	public trackEvent(): Promise<void> {
		// No event tracking for Forensics
		return this.providerReady.then(() => Promise.resolve());
	}

	/**
	 * @public
	 * @method trackPageView
	 * @description The method that actually triggers the tracking of the page view
	 * @returns { Promise<void> }
	 */
	public trackPageView(): Promise<void> {
		// No page tracking for Forensics
		return this.providerReady.then(() => Promise.resolve());
	}
}
