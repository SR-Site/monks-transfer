import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockVideoWithContentController from 'app/component/block/block-video-with-content/BlockVideoWithContentController';
import IBlockVideoWithContentOptions from 'app/component/block/block-video-with-content/IBlockVideoWithContentOptions';

import ko = require('knockout');

class BlockVideoWithContentViewModel extends AbstractBlockComponentViewModel<BlockVideoWithContentController, IBlockVideoWithContentOptions>
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

export default BlockVideoWithContentViewModel;
