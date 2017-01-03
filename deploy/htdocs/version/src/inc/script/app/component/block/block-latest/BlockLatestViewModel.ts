import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockLatestController from 'app/component/block/block-latest/BlockLatestController';
import IBlockLatestOptions from 'app/component/block/block-latest/IBlockLatestOptions';

import ko = require('knockout');

class BlockLatestViewModel extends DefaultComponentViewModel<BlockLatestController, IBlockLatestOptions>
{
	public findOutMoreDisabled:KnockoutObservable<boolean> = ko.observable(false);

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.findOutMoreDisabled = null;

		// always call this last
		super.destruct();
	}
}

export default BlockLatestViewModel;
