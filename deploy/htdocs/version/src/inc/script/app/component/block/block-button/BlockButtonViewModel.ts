import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockButtonController from 'app/component/block/block-button/BlockButtonController';
import IBlockButtonOptions from 'app/component/block/block-button/IBlockButtonOptions';

import ko = require('knockout');
import Alignment from "../../../data/enum/layout/Alignment";

class BlockButtonViewModel extends DefaultComponentViewModel<BlockButtonController, IBlockButtonOptions>
{
	public Alignment:Class = Alignment;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.Alignment = null;

		// always call this last
		super.destruct();
	}
}

export default BlockButtonViewModel;
