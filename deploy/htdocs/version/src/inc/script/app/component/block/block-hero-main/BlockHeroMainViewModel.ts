import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockHeroMainController from 'app/component/block/block-hero-main/BlockHeroMainController';
import IBlockHeroMainOptions from 'app/component/block/block-hero-main/IBlockHeroMainOptions';

import ko = require('knockout');

class BlockHeroMainViewModel extends DefaultComponentViewModel<BlockHeroMainController, IBlockHeroMainOptions>
{
	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockHeroMainViewModel;
