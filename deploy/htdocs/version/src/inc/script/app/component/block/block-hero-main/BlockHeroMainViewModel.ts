import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockHeroMainController from "app/component/block/block-hero-main/BlockHeroMainController";
import IBlockHeroMainOptions from "app/component/block/block-hero-main/IBlockHeroMainOptions";
import Direction from "../../../data/enum/layout/Direction";
import Alignment from "../../../data/enum/layout/Alignment";

import ko = require('knockout');

class BlockHeroMainViewModel extends AbstractBlockComponentViewModel<BlockHeroMainController, IBlockHeroMainOptions>
{
	public Direction: Enum = Direction;
	public Alignment: Enum = Alignment;
	public activeIndex: KnockoutObservable<number> = ko.observable(0);
	public hasStatistics: KnockoutObservable<boolean> = ko.observable(false);

	private _switchComplete: boolean = true;

	/**
	 * @public
	 * @method handleNextClick
	 */
	public handleNextClick(): void
	{
		if(this._switchComplete)
		{
			this._switchComplete = false;

			let newIndex = this.activeIndex() + 1 < this.data.slides.length ? this.activeIndex() + 1 : 0;

			this.controller.changeBackgroundImage(newIndex);

			this.controller.transitionController.transitionOutStep(this.activeIndex())
				.then(()=> this.controller.transitionController.transitionInStep(newIndex))
				.then(()=> this.activeIndex(newIndex))
				.then(() => this._switchComplete = true);
		}
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.hasStatistics = null;
		this.Direction = null;
		this.Alignment = null;
		this.activeIndex = null;

		// always call this last
		super.destruct();
	}
}

export default BlockHeroMainViewModel;
