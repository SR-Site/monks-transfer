import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockNetworkOverviewController from 'app/component/block/block-network-overview/BlockNetworkOverviewController';
import IBlockNetworkOverviewOptions from 'app/component/block/block-network-overview/IBlockNetworkOverviewOptions';

import ko = require('knockout');

class BlockNetworkOverviewViewModel extends AbstractBlockComponentViewModel<BlockNetworkOverviewController, IBlockNetworkOverviewOptions>
{
	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockNetworkOverviewViewModel;
