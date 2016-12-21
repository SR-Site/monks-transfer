import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockDummyComponentController from 'app/component/block/block-dummy-component/BlockDummyComponentController';
import IBlockDummyComponentOptions from 'app/component/block/block-dummy-component/IBlockDummyComponentOptions';

import ko = require('knockout');

class BlockDummyComponentViewModel extends DefaultComponentViewModel<BlockDummyComponentController, IBlockDummyComponentOptions>
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

export default BlockDummyComponentViewModel;
