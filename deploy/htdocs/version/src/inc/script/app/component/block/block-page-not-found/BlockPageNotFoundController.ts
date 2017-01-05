import DefaultComponentController from "../DefaultComponentController";
import BlockPageNotFoundTransitionController from 'app/component/block/block-page-not-found/BlockPageNotFoundTransitionController';
import IBlockPageNotFoundOptions from 'app/component/block/block-page-not-found/IBlockPageNotFoundOptions';
import BlockPageNotFoundViewModel from 'app/component/block/block-page-not-found/BlockPageNotFoundViewModel';

import Log from "lib/temple/util/Log";

class BlockPageNotFoundController extends DefaultComponentController<BlockPageNotFoundViewModel, IBlockPageNotFoundOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockPageNotFound');

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
		this.transitionController = new BlockPageNotFoundTransitionController(this.element, this);

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

export default BlockPageNotFoundController;