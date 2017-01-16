import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockSmallImageController from 'app/component/block/block-small-image/BlockSmallImageController';
import IBlockSmallImageOptions from 'app/component/block/block-small-image/IBlockSmallImageOptions';

import ko = require('knockout');
import Alignment from "../../../data/enum/layout/Alignment";

class BlockSmallImageViewModel extends DefaultComponentViewModel<BlockSmallImageController, IBlockSmallImageOptions>
{

	/**
	 * @public
	 * @get alignmentClass
	 * @returns {string}
	 */
	public get alignmentClass(): string
	{
		return 'align-' + Alignment[this.data.alignment].toLowerCase();
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockSmallImageViewModel;
