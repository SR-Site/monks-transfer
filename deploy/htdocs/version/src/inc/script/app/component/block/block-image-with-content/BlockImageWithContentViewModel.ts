import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockImageWithContentController from 'app/component/block/block-image-with-content/BlockImageWithContentController';
import IBlockImageWithContentOptions from 'app/component/block/block-image-with-content/IBlockImageWithContentOptions';

import ko = require('knockout');
import Alignment from "../../../data/enum/layout/Alignment";

class BlockImageWithContentViewModel extends AbstractBlockComponentViewModel<BlockImageWithContentController, IBlockImageWithContentOptions>
{
	public findOutMoreDisabled:KnockoutObservable<boolean> = ko.observable(false);

	public Alignment:Class= Alignment;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.findOutMoreDisabled = null;
		this.Alignment = null;

		// always call this last
		super.destruct();
	}
}

export default BlockImageWithContentViewModel;
