import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockQuoteSecondaryTransitionController from 'app/component/block/block-quote-secondary/BlockQuoteSecondaryTransitionController';
import IBlockQuoteSecondaryOptions from 'app/component/block/block-quote-secondary/IBlockQuoteSecondaryOptions';
import BlockQuoteSecondaryViewModel from 'app/component/block/block-quote-secondary/BlockQuoteSecondaryViewModel';

import Log from "lib/temple/util/Log";

class BlockQuoteSecondaryController extends AbstractBlockComponentController<BlockQuoteSecondaryViewModel, IBlockQuoteSecondaryOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockQuoteSecondary');

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
		this.transitionController = new BlockQuoteSecondaryTransitionController(this.element, this);

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

export default BlockQuoteSecondaryController;
