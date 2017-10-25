import IAbstractTrackPageViewData from '../IAbstractTrackPageViewData';
import IAbstractTrackEventData from '../IAbstractTrackEventData';

export interface IPageViewData extends IAbstractTrackPageViewData {
	page: string;
}

export interface ITrackEventData extends IAbstractTrackEventData {
	category: string;
	action: string;
	label?: string;
	value?: number;
}

