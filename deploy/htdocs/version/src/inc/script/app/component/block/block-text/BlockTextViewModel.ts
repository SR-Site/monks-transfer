import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockTextController from 'app/component/block/block-text/BlockTextController';
import IBlockTextOptions from 'app/component/block/block-text/IBlockTextOptions';

import ko = require('knockout');

class BlockTextViewModel extends DefaultComponentViewModel<BlockTextController, IBlockTextOptions>
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
