import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockInfoTransitionController from 'app/component/block/block-info/BlockInfoTransitionController';
import IBlockInfoOptions from 'app/component/block/block-info/IBlockInfoOptions';
import BlockInfoViewModel from 'app/component/block/block-info/BlockInfoViewModel';

import Log from "lib/temple/util/Log";

class BlockInfoController extends AbstractBlockComponentController<BlockInfoViewModel, IBlockInfoOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockInfo');

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
		this.transitionController = new BlockInfoTransitionController(this.element, this);

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

export default BlockInfoController;
