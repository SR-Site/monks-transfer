import AbstractTrackingProvider from '../tracking-provider/AbstractTrackingProvider';
import IAbstractTrackingProviderOptions from '../tracking-provider/IAbstractTrackingProviderOptions';

interface ITrackingManagerOptions {
	providers: { [id: string]: AbstractTrackingProvider<IAbstractTrackingProviderOptions> };
}

export default ITrackingManagerOptions;

