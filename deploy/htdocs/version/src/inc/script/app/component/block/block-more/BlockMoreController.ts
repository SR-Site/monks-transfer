import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockMoreTransitionController from 'app/component/block/block-more/BlockMoreTransitionController';
import IBlockMoreOptions from 'app/component/block/block-more/IBlockMoreOptions';
import BlockMoreViewModel from 'app/component/block/block-more/BlockMoreViewModel';

import Log from "lib/temple/util/Log";

class BlockMoreController extends AbstractBlockComponentController<BlockMoreViewModel, IBlockMoreOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockMore');

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
		this.transitionController = new BlockMoreTransitionController(this.element, this);

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

export default BlockMoreController;
