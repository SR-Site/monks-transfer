import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockHeroTertiaryController from "./BlockHeroTertiaryController";

class BlockHeroTertiaryTransitionController extends AbstractTransitionController<BlockHeroTertiaryController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 1, {opacity: 0});

	}
}

export default BlockHeroTertiaryTransitionController;
