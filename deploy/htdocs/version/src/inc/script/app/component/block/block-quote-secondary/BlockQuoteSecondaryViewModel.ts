import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockQuoteSecondaryController from 'app/component/block/block-quote-secondary/BlockQuoteSecondaryController';
import IBlockQuoteSecondaryOptions from 'app/component/block/block-quote-secondary/IBlockQuoteSecondaryOptions';

import ko = require('knockout');

class BlockQuoteSecondaryViewModel extends DefaultComponentViewModel<BlockQuoteSecondaryController, IBlockQuoteSecondaryOptions>
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
