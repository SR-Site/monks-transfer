import DefaultComponentController from "../DefaultComponentController";
import BlockPathToPurchaseTransitionController from 'app/component/block/block-path-to-purchase/BlockPathToPurchaseTransitionController';
import IBlockPathToPurchaseOptions from 'app/component/block/block-path-to-purchase/IBlockPathToPurchaseOptions';
import BlockPathToPurchaseViewModel from 'app/component/block/block-path-to-purchase/BlockPathToPurchaseViewModel';

import Log from "lib/temple/util/Log";

class BlockPathToPurchaseController extends DefaultComponentController<BlockPathToPurchaseViewModel, IBlockPathToPurchaseOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockPathToPurchase');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');
	}

	/**
	* @protected
	* @method allComponentsLoaded
	*/
	protected allComponentsLoaded():void
	{
		this.transitionController = new BlockPathToPurchaseTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockPathToPurchaseController;
