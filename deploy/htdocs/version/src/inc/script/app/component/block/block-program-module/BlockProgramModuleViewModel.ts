import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockProgramModuleController from 'app/component/block/block-program-module/BlockProgramModuleController';
import IBlockProgramModuleOptions from 'app/component/block/block-program-module/IBlockProgramModuleOptions';

import ko = require('knockout');

class BlockProgramModuleViewModel extends DefaultComponentViewModel<BlockProgramModuleController, IBlockProgramModuleOptions>
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

export default BlockProgramModuleViewModel;
