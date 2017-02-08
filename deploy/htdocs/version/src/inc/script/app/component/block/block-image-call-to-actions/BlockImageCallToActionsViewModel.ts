import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockImageCallToActionsController from 'app/component/block/block-image-call-to-actions/BlockImageCallToActionsController';
import IBlockImageCallToActionsOptions from 'app/component/block/block-image-call-to-actions/IBlockImageCallToActionsOptions';

import ko = require('knockout');
import StringUtils from "../../../../lib/temple/util/type/StringUtils";

class BlockImageCallToActionsViewModel extends AbstractBlockComponentViewModel<BlockImageCallToActionsController, IBlockImageCallToActionsOptions>
{
	public StringUtils: Class = StringUtils;

	public activeImageIndex: KnockoutObservable<number> = ko.observable(null);
	public triangleSize:KnockoutObservable<number> = ko.observable(0);

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
		this.StringUtils = null;
		this.activeImageIndex = null;
		this.triangleSize = null;

		// always call this last
		super.destruct();
	}
}

export default BlockImageCallToActionsViewModel;
