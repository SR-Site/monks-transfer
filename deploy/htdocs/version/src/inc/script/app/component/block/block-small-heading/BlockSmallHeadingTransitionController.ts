import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockSmallHeadingController from "./BlockSmallHeadingController";

class BlockSmallHeadingTransitionController extends AbstractTransitionController<BlockSmallHeadingController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element.querySelector('.heading'), 0.8, { y: 50, autoAlpha: 0, ease: Expo.easeOut });
	}
}

export default BlockSmallHeadingTransitionController;
