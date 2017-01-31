import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockImageCarouselController from 'app/component/block/block-image-carousel/BlockImageCarouselController';
import IBlockImageCarouselOptions from 'app/component/block/block-image-carousel/IBlockImageCarouselOptions';

import ko = require('knockout');

class BlockImageCarouselViewModel extends AbstractBlockComponentViewModel<BlockImageCarouselController, IBlockImageCarouselOptions>
{
	public currentPage:KnockoutObservable<number> = ko.observable(0);

	/**
	 * @public
	 * @method handleOpenIndexClick
	 * @param index
	 */
	public handleOpenIndexClick(index:number):void
	{
		this.controller.openIndex(index)
	}

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
