import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockPathToPurchaseController from 'app/component/block/block-path-to-purchase/BlockPathToPurchaseController';
import IBlockPathToPurchaseOptions from 'app/component/block/block-path-to-purchase/IBlockPathToPurchaseOptions';

import ko = require('knockout');
import StringUtils from "../../../../lib/temple/util/type/StringUtils";
import MouseEventHelper from "../../../util/MouseEventHelper";
import Promise = require("bluebird");
import {trackEvent} from "../../../util/Analytics";

class BlockPathToPurchaseViewModel extends AbstractBlockComponentViewModel<BlockPathToPurchaseController, IBlockPathToPurchaseOptions>
{
	public activeIndex: KnockoutObservable<number> = ko.observable(0);
	public StringUtils: Class = StringUtils;
	public MouseEventHelper: Class = MouseEventHelper;

	/**
	 * @private
	 * @method handleClick
	 */
	private handleClick(index: number): void
	{
		trackEvent('pathToPurchase', 'click', this.data.steps[index].heading, index + 1)

		this.activeIndex(index);
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.StringUtils = null;
		this.activeIndex = null;
		this.MouseEventHelper = null;

		// always call this last
		super.destruct();
	}
}

export default BlockPathToPurchaseViewModel;
