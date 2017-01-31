import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockSmallInfoTransitionController from 'app/component/block/block-small-info/BlockSmallInfoTransitionController';
import IBlockSmallInfoOptions from 'app/component/block/block-small-info/IBlockSmallInfoOptions';
import BlockSmallInfoViewModel from 'app/component/block/block-small-info/BlockSmallInfoViewModel';

import Log from "lib/temple/util/Log";

class BlockSmallInfoController extends AbstractBlockComponentController<BlockSmallInfoViewModel, IBlockSmallInfoOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockSmallInfo');

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
		this.transitionController = new BlockSmallInfoTransitionController(this.element, this);

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

export default BlockSmallInfoController;
