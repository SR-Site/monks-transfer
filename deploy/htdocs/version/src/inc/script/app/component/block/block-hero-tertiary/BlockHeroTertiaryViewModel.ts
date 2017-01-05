import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockHeroTertiaryController from 'app/component/block/block-hero-tertiary/BlockHeroTertiaryController';
import IBlockHeroTertiaryOptions from 'app/component/block/block-hero-tertiary/IBlockHeroTertiaryOptions';

import ko = require('knockout');

class BlockHeroTertiaryViewModel extends DefaultComponentViewModel<BlockHeroTertiaryController, IBlockHeroTertiaryOptions>
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

export default BlockHeroTertiaryViewModel;
