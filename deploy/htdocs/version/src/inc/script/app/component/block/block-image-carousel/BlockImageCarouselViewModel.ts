import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockImageCarouselController from 'app/component/block/block-image-carousel/BlockImageCarouselController';
import IBlockImageCarouselOptions from 'app/component/block/block-image-carousel/IBlockImageCarouselOptions';

import ko = require('knockout');

class BlockImageCarouselViewModel extends DefaultComponentViewModel<BlockImageCarouselController, IBlockImageCarouselOptions>
{
	public currentPage:KnockoutObservable<number> = ko.observable(0);

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.currentPage = null;

		// always call this last
		super.destruct();
	}
}

export default BlockImageCarouselViewModel;
