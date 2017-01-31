import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockPageNotFoundController from 'app/component/block/block-page-not-found/BlockPageNotFoundController';
import IBlockPageNotFoundOptions from 'app/component/block/block-page-not-found/IBlockPageNotFoundOptions';

import ko = require('knockout');

class BlockPageNotFoundViewModel extends AbstractBlockComponentViewModel<BlockPageNotFoundController, IBlockPageNotFoundOptions>
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

export default BlockPageNotFoundViewModel;
