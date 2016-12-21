import IPageAsset from '../interface/IPageAsset';
import AbstractEvent from "../../temple/event/AbstractEvent";

class PageEvent extends AbstractEvent
{
	public static TRANSITION_OUT:string = "PageEvent.TRANSITION_OUT";
	public static TRANSITION_OUT_COMPLETE:string = "PageEvent.TRANSITION_OUT_COMPLETE";
	public static TRANSITION_IN:string = "PageEvent.TRANSITION_IN";
	public static TRANSITION_IN_COMPLETE:string = "PageEvent.TRANSITION_IN_COMPLETE";
	public static TRANSITION:string = "PageEvent.TRANSITION";
	public static TRANSITION_COMPLETE:string = "PageEvent.TRANSITION_COMPLETE";
	public static LEVEL_CHANGE:string = "PageEvent.LEVEL_CHANGE";
	public static BEFORE_INIT:string = "PageEvent.BEFORE_INIT";

	constructor(type:string, public page?:IPageAsset)
	{
		super(type);
	}

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():PageEvent
	{
		return new PageEvent(this.type, this.page);
	}
}

export default PageEvent;