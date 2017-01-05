import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockMapSecondaryController from 'app/component/block/block-map-secondary/BlockMapSecondaryController';
import IBlockMapSecondaryOptions from 'app/component/block/block-map-secondary/IBlockMapSecondaryOptions';

import ko = require('knockout');

class BlockMapSecondaryViewModel extends DefaultComponentViewModel<BlockMapSecondaryController, IBlockMapSecondaryOptions>
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

export default BlockMapSecondaryViewModel;
