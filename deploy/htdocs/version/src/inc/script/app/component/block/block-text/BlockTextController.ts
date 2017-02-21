import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockTextTransitionController from 'app/component/block/block-text/BlockTextTransitionController';
import IBlockTextOptions from 'app/component/block/block-text/IBlockTextOptions';
import BlockTextViewModel from 'app/component/block/block-text/BlockTextViewModel';

import Log from "lib/temple/util/Log";

class BlockTextController extends AbstractBlockComponentController<BlockTextViewModel, IBlockTextOptions, BlockTextTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockText');

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
		this.transitionController = new BlockTextTransitionController(this.element, this);

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

export default BlockTextController;
