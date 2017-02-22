import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockArticleTeaserController from "app/component/block/block-article-teaser/BlockArticleTeaserController";
import IBlockArticleTeaserOptions from "app/component/block/block-article-teaser/IBlockArticleTeaserOptions";
import ThemeHelper from "../../../util/ThemeHelper";

import ko = require('knockout');

class BlockArticleTeaserViewModel extends AbstractBlockComponentViewModel<BlockArticleTeaserController, IBlockArticleTeaserOptions>
{
	public ThemeHelper:Class = ThemeHelper;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.ThemeHelper = null;

		// always call this last
		super.destruct();
	}
}

export default BlockArticleTeaserViewModel;
