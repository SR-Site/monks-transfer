import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockMapController from 'app/component/block/block-map/BlockMapController';
import IBlockMapOptions from 'app/component/block/block-map/IBlockMapOptions';

import ko = require('knockout');
import StringUtils from "../../../../lib/temple/util/type/StringUtils";

class BlockMapViewModel extends AbstractBlockComponentViewModel<BlockMapController, IBlockMapOptions>
{
	public StringUtils: Class = StringUtils;
	public slides: KnockoutObservableArray<{label: string; heading: string; paragraph: string;}> = ko.observableArray([]);
	public activeSlide:KnockoutObservable<number> = ko.observable(0);

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.StringUtils = null;
		this.activeSlide = null;

		// always call this last
		super.destruct();
	}
}

export default BlockMapViewModel;
