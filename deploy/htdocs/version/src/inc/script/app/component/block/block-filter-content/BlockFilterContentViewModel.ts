import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockFilterContentController from 'app/component/block/block-filter-content/BlockFilterContentController';
import IBlockFilterContentOptions from 'app/component/block/block-filter-content/IBlockFilterContentOptions';

import ko = require('knockout');
import IBlock from "../../../data/interface/block/IBlock";
import BlockType from "../../../data/enum/type/BlockType";

class BlockFilterContentViewModel extends DefaultComponentViewModel<BlockFilterContentController, IBlockFilterContentOptions>
{
	public BlockType:Enum = BlockType;

	public items:KnockoutObservableArray<IBlock> = ko.observableArray([]);

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.BlockType = null;
		this.items = null;

		// always call this last
		super.destruct();
	}
}

export default BlockFilterContentViewModel;
