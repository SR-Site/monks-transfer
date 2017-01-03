import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockImageCallToActionsController from 'app/component/block/block-image-call-to-actions/BlockImageCallToActionsController';
import IBlockImageCallToActionsOptions from 'app/component/block/block-image-call-to-actions/IBlockImageCallToActionsOptions';

import ko = require('knockout');

class BlockImageCallToActionsViewModel extends DefaultComponentViewModel<BlockImageCallToActionsController, IBlockImageCallToActionsOptions>
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

export default BlockImageCallToActionsViewModel;
