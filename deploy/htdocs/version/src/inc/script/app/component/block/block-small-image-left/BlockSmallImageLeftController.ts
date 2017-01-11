import DefaultComponentController from "../DefaultComponentController";
import BlockSmallImageLeftTransitionController from 'app/component/block/block-small-image-left/BlockSmallImageLeftTransitionController';
import IBlockSmallImageLeftOptions from 'app/component/block/block-small-image-left/IBlockSmallImageLeftOptions';
import BlockSmallImageLeftViewModel from 'app/component/block/block-small-image-left/BlockSmallImageLeftViewModel';

import Log from "lib/temple/util/Log";

class BlockSmallImageLeftController extends DefaultComponentController<BlockSmallImageLeftViewModel, IBlockSmallImageLeftOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockSmallImageLeft');

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
		this.transitionController = new BlockSmallImageLeftTransitionController(this.element, this);

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

export default BlockSmallImageLeftController;
