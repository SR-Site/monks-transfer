import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockMapSecondaryController from 'app/component/block/block-map-secondary/BlockMapSecondaryController';
import IBlockMapSecondaryOptions from 'app/component/block/block-map-secondary/IBlockMapSecondaryOptions';

import ko = require('knockout');

class BlockMapSecondaryViewModel extends AbstractBlockComponentViewModel<BlockMapSecondaryController, IBlockMapSecondaryOptions>
{
	public sequenceProgress:KnockoutObservable<number> = ko.observable(0);

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.sequenceProgress = null;

		// always call this last
		super.destruct();
	}
}

export default BlockMapSecondaryViewModel;
