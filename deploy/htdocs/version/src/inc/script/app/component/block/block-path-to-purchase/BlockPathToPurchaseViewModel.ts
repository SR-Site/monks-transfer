import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockPathToPurchaseController from 'app/component/block/block-path-to-purchase/BlockPathToPurchaseController';
import IBlockPathToPurchaseOptions from 'app/component/block/block-path-to-purchase/IBlockPathToPurchaseOptions';

import ko = require('knockout');
import StringUtils from "../../../../lib/temple/util/type/StringUtils";
import MouseEventHelper from "../../../util/MouseEventHelper";

class BlockPathToPurchaseViewModel extends DefaultComponentViewModel<BlockPathToPurchaseController, IBlockPathToPurchaseOptions>
{
	public activeIndex: KnockoutObservable<number> = ko.observable(0);
	public StringUtils: Class = StringUtils;
	public MouseEventHelper:Class = MouseEventHelper;


	private _switchComplete = true;

	/**
	 * @private
	 * @method handleClick
	 */
	private handleClick(index: number): void
	{
		if(this._switchComplete)
		{
			this._switchComplete = false;

			this.activeIndex(index);

			this.controller.changeBackgroundImage(index)
				.then(() => this._switchComplete = true);
		}
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
