import DefaultComponentController from "../DefaultComponentController";
import BlockQuoteTransitionController from 'app/component/block/block-quote/BlockQuoteTransitionController';
import IBlockQuoteOptions from 'app/component/block/block-quote/IBlockQuoteOptions';
import BlockQuoteViewModel from 'app/component/block/block-quote/BlockQuoteViewModel';

import Log from "lib/temple/util/Log";

class BlockQuoteController extends DefaultComponentController<BlockQuoteViewModel, IBlockQuoteOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockQuote');

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
		this.transitionController = new BlockQuoteTransitionController(this.element, this);

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

export default BlockQuoteController;
