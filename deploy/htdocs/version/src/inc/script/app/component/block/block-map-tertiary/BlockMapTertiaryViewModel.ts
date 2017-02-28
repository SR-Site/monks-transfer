import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockMapTertiaryController from 'app/component/block/block-map-tertiary/BlockMapTertiaryController';
import IBlockMapTertiaryOptions from 'app/component/block/block-map-tertiary/IBlockMapTertiaryOptions';

import ko = require('knockout');

class BlockMapTertiaryViewModel extends AbstractBlockComponentViewModel<BlockMapTertiaryController, IBlockMapTertiaryOptions>
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

export default BlockMapTertiaryViewModel;
