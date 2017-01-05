import DefaultComponentController from "../DefaultComponentController";
import BlockSmallHeadingTransitionController from 'app/component/block/block-small-heading/BlockSmallHeadingTransitionController';
import IBlockSmallHeadingOptions from 'app/component/block/block-small-heading/IBlockSmallHeadingOptions';
import BlockSmallHeadingViewModel from 'app/component/block/block-small-heading/BlockSmallHeadingViewModel';

import Log from "lib/temple/util/Log";

class BlockSmallHeadingController extends DefaultComponentController<BlockSmallHeadingViewModel, IBlockSmallHeadingOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockSmallHeading');

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
		this.transitionController = new BlockSmallHeadingTransitionController(this.element, this);

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

export default BlockSmallHeadingController;
