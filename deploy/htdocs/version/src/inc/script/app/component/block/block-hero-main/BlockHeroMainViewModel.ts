import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockHeroMainController from "app/component/block/block-hero-main/BlockHeroMainController";
import IBlockHeroMainOptions from "app/component/block/block-hero-main/IBlockHeroMainOptions";
import Direction from "../../../data/enum/layout/Direction";
import Alignment from "../../../data/enum/layout/Alignment";

import ko = require('knockout');

class BlockHeroMainViewModel extends DefaultComponentViewModel<BlockHeroMainController, IBlockHeroMainOptions>
{
	public Direction: Enum = Direction;
	public Alignment: Enum = Alignment;
	public activeIndex: KnockoutObservable<number> = ko.observable(0);

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.Direction = null;
		this.Alignment = null;
		this.activeIndex = null;

		// always call this last
		super.destruct();
	}
}

export default BlockHeroMainViewModel;
