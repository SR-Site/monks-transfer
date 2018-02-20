import IAbstractTrackingProviderOptions from '../IAbstractTrackingProviderOptions';

interface IPardotProviderOptions extends IAbstractTrackingProviderOptions {
	clientId:string;
	applicationId:string;
	hostname:string;
}

export default IPardotProviderOptions;
