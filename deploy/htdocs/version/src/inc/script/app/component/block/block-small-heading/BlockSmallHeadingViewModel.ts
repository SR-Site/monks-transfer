import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockSmallHeadingController from 'app/component/block/block-small-heading/BlockSmallHeadingController';
import IBlockSmallHeadingOptions from 'app/component/block/block-small-heading/IBlockSmallHeadingOptions';

import ko = require('knockout');

class BlockSmallHeadingViewModel extends DefaultComponentViewModel<BlockSmallHeadingController, IBlockSmallHeadingOptions>
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

export default BlockSmallHeadingViewModel;
