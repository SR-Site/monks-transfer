import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockHeroSecondaryController from 'app/component/block/block-hero-secondary/BlockHeroSecondaryController';
import IBlockHeroSecondaryOptions from 'app/component/block/block-hero-secondary/IBlockHeroSecondaryOptions';

import ko = require('knockout');
import Direction from "../../../data/enum/layout/Direction";
import Alignment from "../../../data/enum/layout/Alignment";

class BlockHeroSecondaryViewModel extends DefaultComponentViewModel<BlockHeroSecondaryController, IBlockHeroSecondaryOptions>
{
	public Direction:Enum = Direction;
	public Alignment:Enum = Alignment;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.Direction = null;
		this.Alignment = null;

		// always call this last
		super.destruct();
	}
}

export default BlockHeroSecondaryViewModel;
