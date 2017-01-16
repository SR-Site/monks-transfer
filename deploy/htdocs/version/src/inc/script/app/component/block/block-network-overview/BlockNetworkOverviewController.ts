import DefaultComponentController from "../DefaultComponentController";
import BlockNetworkOverviewTransitionController from 'app/component/block/block-network-overview/BlockNetworkOverviewTransitionController';
import IBlockNetworkOverviewOptions from 'app/component/block/block-network-overview/IBlockNetworkOverviewOptions';
import BlockNetworkOverviewViewModel from 'app/component/block/block-network-overview/BlockNetworkOverviewViewModel';

import Log from "lib/temple/util/Log";

class BlockNetworkOverviewController extends DefaultComponentController<BlockNetworkOverviewViewModel, IBlockNetworkOverviewOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockNetworkOverview');

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
		this.transitionController = new BlockNetworkOverviewTransitionController(this.element, this);

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

export default BlockNetworkOverviewController;
