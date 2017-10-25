import IAbstractTrackingProviderOptions from '../IAbstractTrackingProviderOptions';

interface IGoogleAnalyticsProviderOptions extends IAbstractTrackingProviderOptions {
	trackingId: string;
}

export default IGoogleAnalyticsProviderOptions;

