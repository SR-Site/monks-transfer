import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockArticleTeaserController from "app/component/block/block-article-teaser/BlockArticleTeaserController";
import IBlockArticleTeaserOptions from "app/component/block/block-article-teaser/IBlockArticleTeaserOptions";
import ThemeHelper from "../../../util/ThemeHelper";

import ko = require('knockout');
import StringUtils from "../../../../lib/temple/util/type/StringUtils";

class BlockArticleTeaserViewModel extends AbstractBlockComponentViewModel<BlockArticleTeaserController, IBlockArticleTeaserOptions>
{
	public ThemeHelper:Class = ThemeHelper;
	public StringUtils:Class = StringUtils;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.ThemeHelper = null;
		this.StringUtils = null;

		// always call this last
		super.destruct();
	}
}

export default BlockArticleTeaserViewModel;
