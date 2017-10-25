import IAbstractTrackEventData from 'util/tracking/tracking-provider/IAbstractTrackEventData';

export interface ITrackEventData extends IAbstractTrackEventData {
	event?:
		| 'ViewContent'
		| 'Search'
		| 'AddToCart'
		| 'AddToWishlist'
		| 'InitiateCheckout'
		| 'AddPaymentInfo'
		| 'Purchase'
		| 'CompleteRegistration'
		| string;
	parameters?: {
		value?: string;
		currency?: string;
		content_name?: string;
		content_category?: string;
		content_ids?: string;
		contents?: string;
		content_type?: string;
		num_items?: string;
		search_string?: string;
		status?: string;
		[customValue: string]: string;
	};
}
