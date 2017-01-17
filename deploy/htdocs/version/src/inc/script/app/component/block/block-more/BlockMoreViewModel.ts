import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockMoreController from 'app/component/block/block-more/BlockMoreController';
import IBlockMoreOptions from 'app/component/block/block-more/IBlockMoreOptions';

import ko = require('knockout');

class BlockMoreViewModel extends DefaultComponentViewModel<BlockMoreController, IBlockMoreOptions>
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
