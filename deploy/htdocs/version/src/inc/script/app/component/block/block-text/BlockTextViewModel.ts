import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockTextController from 'app/component/block/block-text/BlockTextController';
import IBlockTextOptions from 'app/component/block/block-text/IBlockTextOptions';

import ko = require('knockout');

class BlockTextViewModel extends AbstractBlockComponentViewModel<BlockTextController, IBlockTextOptions>
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

export default BlockTextViewModel;
