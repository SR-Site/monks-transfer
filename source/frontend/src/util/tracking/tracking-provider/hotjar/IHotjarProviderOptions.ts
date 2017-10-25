import IAbstractTrackingProviderOptions from '../IAbstractTrackingProviderOptions';

interface IHotjarProviderOptions extends IAbstractTrackingProviderOptions {
	trackingId: string;
}

export default IHotjarProviderOptions;
