import IPageAsset from '../interface/IPageAsset';
import AbstractEvent from "../../temple/event/AbstractEvent";

class BranchLoaderEvent extends AbstractEvent
{
	public static LOAD_PAGE:string = "BranchLoaderEvent.LOAD_PAGE";
	public static LOAD_ASSET:string = "BranchLoaderEvent.LOAD_ASSET";
	public static START:string = "BranchLoaderEvent.START";
	public static COMPLETE:string = "BranchLoaderEvent.COMPLETE";

	constructor(type:string, public asset:IPageAsset = null)
	{
		super(type);
	}

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():BranchLoaderEvent
	{
		return new BranchLoaderEvent(this.type, this.asset);
	}
}

export default BranchLoaderEvent;