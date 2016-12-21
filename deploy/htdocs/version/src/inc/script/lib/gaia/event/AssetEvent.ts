import IPageAsset from '../interface/IPageAsset';
import AbstractEvent from "../../temple/event/AbstractEvent";

class AssetEvent extends AbstractEvent
{
	public static ASSET_COMPLETE:string = "AssetEvent.ASSET_COMPLETE";
	public static ASSET_PROGRESS:string = "AssetEvent.ASSET_PROGRESS";
	public static ASSET_ERROR:string = "AssetEvent.ASSET_ERROR";

	constructor(type:string, public asset:IPageAsset = null, public loaded:number = 0, public total:number = 0, public perc:number = 0, public bytes:boolean = false)
	{
		super(type);
	}

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():AssetEvent
	{
		return new AssetEvent(this.type, this.asset, this.loaded, this.total, this.perc, this.bytes);
	}
}

export default AssetEvent;