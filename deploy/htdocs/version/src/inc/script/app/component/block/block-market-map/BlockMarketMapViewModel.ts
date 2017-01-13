import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockMarketMapController from 'app/component/block/block-market-map/BlockMarketMapController';
import IBlockMarketMapOptions from 'app/component/block/block-market-map/IBlockMarketMapOptions';

import ko = require('knockout');

class BlockMarketMapViewModel extends DefaultComponentViewModel<BlockMarketMapController, IBlockMarketMapOptions>
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

export default BlockMarketMapViewModel;
