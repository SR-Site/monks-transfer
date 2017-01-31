import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockMoreController from 'app/component/block/block-more/BlockMoreController';
import IBlockMoreOptions from 'app/component/block/block-more/IBlockMoreOptions';

import ko = require('knockout');

class BlockMoreViewModel extends AbstractBlockComponentViewModel<BlockMoreController, IBlockMoreOptions>
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

export default BlockMoreViewModel;
