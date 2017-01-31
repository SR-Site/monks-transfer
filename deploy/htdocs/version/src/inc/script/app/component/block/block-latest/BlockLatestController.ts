import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockLatestTransitionController from 'app/component/block/block-latest/BlockLatestTransitionController';
import IBlockLatestOptions from 'app/component/block/block-latest/IBlockLatestOptions';
import BlockLatestViewModel from 'app/component/block/block-latest/BlockLatestViewModel';

import Log from "lib/temple/util/Log";

class BlockLatestController extends AbstractBlockComponentController<BlockLatestViewModel, IBlockLatestOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockLatest');

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
		this.transitionController = new BlockLatestTransitionController(this.element, this);

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

export default BlockLatestController;
