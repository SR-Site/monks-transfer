import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockPathToPurchaseController from 'app/component/block/block-path-to-purchase/BlockPathToPurchaseController';
import IBlockPathToPurchaseOptions from 'app/component/block/block-path-to-purchase/IBlockPathToPurchaseOptions';

import ko = require('knockout');
import StringUtils from "../../../../lib/temple/util/type/StringUtils";

class BlockPathToPurchaseViewModel extends DefaultComponentViewModel<BlockPathToPurchaseController, IBlockPathToPurchaseOptions>
{
	public currentPage:KnockoutObservable<number> = ko.observable(0);
	public StringUtils: Class = StringUtils;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.StringUtils = null;

		// always call this last
		super.destruct();
	}
}

export default BlockPathToPurchaseViewModel;
