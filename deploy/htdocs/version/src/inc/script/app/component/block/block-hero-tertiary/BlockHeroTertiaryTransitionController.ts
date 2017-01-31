import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";

class BlockHeroTertiaryTransitionController extends AbstractTransitionController
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
