import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockStoryInfoImagesController from 'app/component/block/block-story-info-images/BlockStoryInfoImagesController';
import IBlockStoryInfoImagesOptions from 'app/component/block/block-story-info-images/IBlockStoryInfoImagesOptions';

import ko = require('knockout');
import MouseEventHelper from "../../../util/MouseEventHelper";
import StringUtils from "../../../../lib/temple/util/type/StringUtils";
import ThemeHelper from "../../../util/ThemeHelper";

class BlockStoryInfoImagesViewModel extends AbstractBlockComponentViewModel<BlockStoryInfoImagesController, IBlockStoryInfoImagesOptions>
{
	public ThemeHelper:Class = ThemeHelper;
	public MouseEventHelper:Class = MouseEventHelper;
	public StringUtils:Class = StringUtils;

	public activeStory:KnockoutObservable<number> = ko.observable(0);

	/**
	 * @public
	 * @method handleMouseEnter
	 */
	public handleMouseEnter(index:number):void
	{
		this.activeStory(index);
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.ThemeHelper = null;
		this.MouseEventHelper = null;
		this.activeStory = null;

		// always call this last
		super.destruct();
	}
}

export default BlockStoryInfoImagesViewModel;
