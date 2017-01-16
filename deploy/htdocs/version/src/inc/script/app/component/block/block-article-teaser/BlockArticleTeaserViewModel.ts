import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockArticleTeaserController from 'app/component/block/block-article-teaser/BlockArticleTeaserController';
import IBlockArticleTeaserOptions from 'app/component/block/block-article-teaser/IBlockArticleTeaserOptions';

import ko = require('knockout');

class BlockArticleTeaserViewModel extends DefaultComponentViewModel<BlockArticleTeaserController, IBlockArticleTeaserOptions>
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

export default BlockArticleTeaserViewModel;
