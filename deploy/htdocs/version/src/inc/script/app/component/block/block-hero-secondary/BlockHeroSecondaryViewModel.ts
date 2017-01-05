import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockHeroSecondaryController from 'app/component/block/block-hero-secondary/BlockHeroSecondaryController';
import IBlockHeroSecondaryOptions from 'app/component/block/block-hero-secondary/IBlockHeroSecondaryOptions';

import ko = require('knockout');
import Direction from "../../../data/enum/layout/Direction";

class BlockHeroSecondaryViewModel extends DefaultComponentViewModel<BlockHeroSecondaryController, IBlockHeroSecondaryOptions>
{
	public Direction:Enum = Direction;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.Direction = null

		// always call this last
		super.destruct();
	}
}

export default BlockHeroSecondaryViewModel;
