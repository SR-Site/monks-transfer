import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockHowToAdvertiseController from 'app/component/block/block-how-to-advertise/BlockHowToAdvertiseController';
import IBlockHowToAdvertiseOptions from 'app/component/block/block-how-to-advertise/IBlockHowToAdvertiseOptions';

import ko = require('knockout');

class BlockHowToAdvertiseViewModel extends DefaultComponentViewModel<BlockHowToAdvertiseController, IBlockHowToAdvertiseOptions>
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

export default BlockHowToAdvertiseViewModel;
