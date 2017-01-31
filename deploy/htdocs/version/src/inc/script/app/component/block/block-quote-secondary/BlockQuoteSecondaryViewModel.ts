import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockQuoteSecondaryController from 'app/component/block/block-quote-secondary/BlockQuoteSecondaryController';
import IBlockQuoteSecondaryOptions from 'app/component/block/block-quote-secondary/IBlockQuoteSecondaryOptions';

import ko = require('knockout');

class BlockQuoteSecondaryViewModel extends AbstractBlockComponentViewModel<BlockQuoteSecondaryController, IBlockQuoteSecondaryOptions>
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

export default BlockQuoteSecondaryViewModel;
