import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockSmallImageLeftController from 'app/component/block/block-small-image-left/BlockSmallImageLeftController';
import IBlockSmallImageLeftOptions from 'app/component/block/block-small-image-left/IBlockSmallImageLeftOptions';

import ko = require('knockout');

class BlockSmallImageLeftViewModel extends DefaultComponentViewModel<BlockSmallImageLeftController, IBlockSmallImageLeftOptions>
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

export default BlockSmallImageLeftViewModel;
