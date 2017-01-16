import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockStoryInfoImagesController from 'app/component/block/block-story-info-images/BlockStoryInfoImagesController';
import IBlockStoryInfoImagesOptions from 'app/component/block/block-story-info-images/IBlockStoryInfoImagesOptions';

import ko = require('knockout');

class BlockStoryInfoImagesViewModel extends DefaultComponentViewModel<BlockStoryInfoImagesController, IBlockStoryInfoImagesOptions>
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

export default BlockStoryInfoImagesViewModel;
