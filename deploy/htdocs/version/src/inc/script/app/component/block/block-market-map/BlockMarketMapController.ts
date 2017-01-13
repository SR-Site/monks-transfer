import DefaultComponentController from "../DefaultComponentController";
import BlockMarketMapTransitionController from 'app/component/block/block-market-map/BlockMarketMapTransitionController';
import IBlockMarketMapOptions from 'app/component/block/block-market-map/IBlockMarketMapOptions';
import BlockMarketMapViewModel from 'app/component/block/block-market-map/BlockMarketMapViewModel';

import Log from "lib/temple/util/Log";

class BlockMarketMapController extends DefaultComponentController<BlockMarketMapViewModel, IBlockMarketMapOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockMarketMap');

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
		this.transitionController = new BlockMarketMapTransitionController(this.element, this);

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

export default BlockMarketMapController;
