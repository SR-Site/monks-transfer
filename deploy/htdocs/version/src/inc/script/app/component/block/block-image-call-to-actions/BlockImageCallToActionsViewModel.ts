import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockImageCallToActionsController from "app/component/block/block-image-call-to-actions/BlockImageCallToActionsController";
import IBlockImageCallToActionsOptions from "app/component/block/block-image-call-to-actions/IBlockImageCallToActionsOptions";
import StringUtils from "../../../../lib/temple/util/type/StringUtils";
import ThemeHelper from "../../../util/ThemeHelper";

import ko = require('knockout');

class BlockImageCallToActionsViewModel extends AbstractBlockComponentViewModel<BlockImageCallToActionsController, IBlockImageCallToActionsOptions>
{
	public StringUtils: Class = StringUtils;
	public ThemeHelper:Class = ThemeHelper;

	public activeImageIndex: KnockoutObservable<number> = ko.observable(null);
	public triangleSize:KnockoutObservable<number> = ko.observable(0);
	public transitionInComplete:KnockoutObservable<boolean> = ko.observable(false);


	/**
	 * @public
	 * @method handleMouseEnter
	 */
	public handleMouseEnter(data): void
	{
		if(this.controller.transitionController.transitionInComplete)
		{
			this.activeImageIndex(this.data.callToActions.indexOf(data));
			this.controller.clipImages(1);
		}
	}

	/**
	 * @public
	 * @method handleMouseLeave
	 */
	public handleMouseLeave(): void
	{
		if(this.controller.transitionController.transitionInComplete)
		{
			this.activeImageIndex(null);
			this.controller.clipImages(1);
		}
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.ThemeHelper = null;
		this.StringUtils = null;
		this.activeImageIndex = null;
		this.triangleSize = null;

		// always call this last
		super.destruct();
	}
}

export default BlockImageCallToActionsViewModel;
