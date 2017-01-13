import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockInfoController from 'app/component/block/block-info/BlockInfoController';
import IBlockInfoOptions from 'app/component/block/block-info/IBlockInfoOptions';

import ko = require('knockout');

class BlockInfoViewModel extends DefaultComponentViewModel<BlockInfoController, IBlockInfoOptions>
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

export default BlockInfoViewModel;
