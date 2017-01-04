import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockHeroMainController from 'app/component/block/block-hero-main/BlockHeroMainController';
import IBlockHeroMainOptions from 'app/component/block/block-hero-main/IBlockHeroMainOptions';

import ko = require('knockout');
import Direction from "../../../data/enum/layout/Direction";

class BlockHeroMainViewModel extends DefaultComponentViewModel<BlockHeroMainController, IBlockHeroMainOptions>
{
	public Direction:Enum = Direction;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.Direction = null;

		// always call this last
		super.destruct();
	}
}

export default BlockHeroMainViewModel;
