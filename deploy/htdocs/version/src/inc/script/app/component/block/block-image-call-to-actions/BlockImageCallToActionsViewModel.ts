import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockImageCallToActionsController from 'app/component/block/block-image-call-to-actions/BlockImageCallToActionsController';
import IBlockImageCallToActionsOptions from 'app/component/block/block-image-call-to-actions/IBlockImageCallToActionsOptions';

import ko = require('knockout');
import StringUtils from "../../../../lib/temple/util/type/StringUtils";

class BlockImageCallToActionsViewModel extends DefaultComponentViewModel<BlockImageCallToActionsController, IBlockImageCallToActionsOptions>
{
	public StringUtils:Class = StringUtils;

	public activeImageIndex:KnockoutObservable<number> = ko.observable(null);

	/**
	* @public
	* @method handleMouseEnter
	*/
	public handleMouseEnter(data):void
	{
		this.activeImageIndex(this.data.callToActions.indexOf(data))
	}

	/**
	* @public
	* @method handleMouseLeave
	*/
	public handleMouseLeave():void
	{
		this.activeImageIndex(null);
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.StringUtils = null;
		this.activeImageIndex = null;

		// always call this last
		super.destruct();
	}
}

export default BlockImageCallToActionsViewModel;
