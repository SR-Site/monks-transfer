import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockTextController from "./BlockTextController";

class BlockTextTransitionController extends AbstractTransitionController<BlockTextController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.8, {y: 50, autoAlpha: 0, ease: Expo.easeOut});
	}
}

export default BlockTextTransitionController;
