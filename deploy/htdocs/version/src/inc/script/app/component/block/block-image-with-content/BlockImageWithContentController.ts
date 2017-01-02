import DefaultComponentController from "../DefaultComponentController";
import BlockImageWithContentTransitionController from 'app/component/block/block-image-with-content/BlockImageWithContentTransitionController';
import IBlockImageWithContentOptions from 'app/component/block/block-image-with-content/IBlockImageWithContentOptions';
import BlockImageWithContentViewModel from 'app/component/block/block-image-with-content/BlockImageWithContentViewModel';

import Log from "lib/temple/util/Log";

class BlockImageWithContentController extends DefaultComponentController<BlockImageWithContentViewModel, IBlockImageWithContentOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockImageWithContent');

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
		this.transitionController = new BlockImageWithContentTransitionController(this.element, this);

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

export default BlockImageWithContentController;
