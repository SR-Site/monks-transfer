import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockSmallImageTransitionController from 'app/component/block/block-small-image/BlockSmallImageTransitionController';
import IBlockSmallImageOptions from 'app/component/block/block-small-image/IBlockSmallImageOptions';
import BlockSmallImageViewModel from 'app/component/block/block-small-image/BlockSmallImageViewModel';

import Log from "lib/temple/util/Log";

class BlockSmallImageController extends AbstractBlockComponentController<BlockSmallImageViewModel, IBlockSmallImageOptions, BlockSmallImageTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockSmallImage');

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
		this.transitionController = new BlockSmallImageTransitionController(this.element, this);

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

export default BlockSmallImageController;
