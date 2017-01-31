import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockHowToAdvertiseController from 'app/component/block/block-how-to-advertise/BlockHowToAdvertiseController';
import IBlockHowToAdvertiseOptions from 'app/component/block/block-how-to-advertise/IBlockHowToAdvertiseOptions';

import ko = require('knockout');

class BlockHowToAdvertiseViewModel extends AbstractBlockComponentViewModel<BlockHowToAdvertiseController, IBlockHowToAdvertiseOptions>
{
	public activeIndex:KnockoutObservable<number> = ko.observable(0);

	/**
	 * @public
	 * @method handleStepClick
	 * @param index
	 */
	public handleStepClick(index:number):void
	{
		this.activeIndex(index);
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.activeIndex = null;

		// always call this last
		super.destruct();
	}
}

export default BlockHowToAdvertiseViewModel;
