import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockQuoteController from 'app/component/block/block-quote/BlockQuoteController';
import IBlockQuoteOptions from 'app/component/block/block-quote/IBlockQuoteOptions';

import ko = require('knockout');

class BlockQuoteViewModel extends AbstractBlockComponentViewModel<BlockQuoteController, IBlockQuoteOptions>
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

export default BlockQuoteViewModel;
