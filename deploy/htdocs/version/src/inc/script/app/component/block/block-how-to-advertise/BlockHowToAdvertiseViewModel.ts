import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockHowToAdvertiseController from 'app/component/block/block-how-to-advertise/BlockHowToAdvertiseController';
import IBlockHowToAdvertiseOptions from 'app/component/block/block-how-to-advertise/IBlockHowToAdvertiseOptions';

import ko = require('knockout');

class BlockHowToAdvertiseViewModel extends AbstractBlockComponentViewModel<BlockHowToAdvertiseController, IBlockHowToAdvertiseOptions>
{
	/**
	 * @public
	 * @method handleStepClick
	 */
	public handleStepClick(index:number):void
	{
		this.controller.openStep(index);
	}

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
