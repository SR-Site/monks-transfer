import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockFilterContentController from 'app/component/block/block-filter-content/BlockFilterContentController';
import IBlockFilterContentOptions from 'app/component/block/block-filter-content/IBlockFilterContentOptions';

import ko = require('knockout');

class BlockFilterContentViewModel extends DefaultComponentViewModel<BlockFilterContentController, IBlockFilterContentOptions>
{
	public items:KnockoutObservableArray<any> = ko.observableArray([]);

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

export default BlockFilterContentViewModel;
