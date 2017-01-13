import PanelBlocks from "../enum/block/PanelBlocks";

class LayoutModel
{
	private _footer = {};
	private _navigation = {};

	private _slideOutPanel = {
		[PanelBlocks.CONTACT]: null,
	};

	/**
	 * @public
	 * @method addSlideOutPanel
	 */
	public addSlideOutPanel(data:{
		contact:any;
	}):void
	{
		this._slideOutPanel[PanelBlocks.CONTACT] = data.contact;
	}

	/**
	 * @public
	 * @method getSlideOutPanel
	 */
	public getSlideOutPanel(panel:string):any
	{
		return this._slideOutPanel[panel];
	}
}

export default LayoutModel;
