import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockSmallInfoController from 'app/component/block/block-small-info/BlockSmallInfoController';
import IBlockSmallInfoOptions from 'app/component/block/block-small-info/IBlockSmallInfoOptions';

import ko = require('knockout');

class BlockSmallInfoViewModel extends DefaultComponentViewModel<BlockSmallInfoController, IBlockSmallInfoOptions>
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

export default BlockSmallInfoViewModel;
