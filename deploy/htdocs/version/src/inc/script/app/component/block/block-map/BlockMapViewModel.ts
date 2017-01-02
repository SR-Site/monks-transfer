import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockMapController from 'app/component/block/block-map/BlockMapController';
import IBlockMapOptions from 'app/component/block/block-map/IBlockMapOptions';

import ko = require('knockout');

class BlockMapViewModel extends DefaultComponentViewModel<BlockMapController, IBlockMapOptions>
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

export default BlockMapViewModel;
