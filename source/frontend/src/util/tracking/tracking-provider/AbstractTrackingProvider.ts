import Disposable from 'seng-disposable';
import { Promise } from 'es6-promise';
import IAbstractTrackPageViewData from './IAbstractTrackPageViewData';
import IAbstractTrackEventData from './IAbstractTrackEventData';
import bows from 'bows';

abstract class AbstractTrackingProvider<T> extends Disposable {
	protected providerOptions: T;

	protected providerReadyResolveMethod: () => void;
	protected providerReadyRejectMethod: () => void;

	protected providerReady: Promise<void>;
	protected logger: bows;

	constructor(options: T) {
		super();

		this.providerOptions = options;

		// This is promise is there to make sure the provider is ready when triggering the tracking methods
		this.providerReady = new Promise<void>((resolve, reject) => {
			this.providerReadyResolveMethod = resolve;
			this.providerReadyRejectMethod = reject;
		});

		// Initialize the provider
		this.init();
	}

	/**
	 * @protected
	 * @method init
	 * @description abstract init method that initializes the tracking provider third party library
	 */
	protected abstract init(): void;

	/**
	 * @public
	 * @method trackEvent
	 * @description Abstract method used on all tracking providers to actually trigger the event tracking
	 * @returns {Promise<void>}
	 */
	public abstract trackEvent(data: IAbstractTrackEventData): Promise<void>;

	/**
	 * @public
	 * @method trackPageView
	 * @description Abstract method used on all tracking providers to actually trigger the page view
	 * @returns {Promise<void>}
	 */
	public abstract trackPageView(data: IAbstractTrackPageViewData): Promise<void>;
}

export default AbstractTrackingProvider;
