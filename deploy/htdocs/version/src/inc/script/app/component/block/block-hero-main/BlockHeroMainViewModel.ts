import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockHeroMainController from 'app/component/block/block-hero-main/BlockHeroMainController';
import IBlockHeroMainOptions from 'app/component/block/block-hero-main/IBlockHeroMainOptions';

import ko = require('knockout');
import Direction from "../../../data/enum/layout/Direction";
import Type from "../../../../lib/temple/util/Type";
import Alignment from "../../../data/enum/layout/Alignment";

class BlockHeroMainViewModel extends DefaultComponentViewModel<BlockHeroMainController, IBlockHeroMainOptions>
{
	public Direction: Enum = Direction;
	public Alignment: Enum = Alignment;
	public Type: Class = Type;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.Type = null;
		this.Direction = null;
		this.Alignment = null;

		// always call this last
		super.destruct();
	}
}

export default BlockHeroMainViewModel;
