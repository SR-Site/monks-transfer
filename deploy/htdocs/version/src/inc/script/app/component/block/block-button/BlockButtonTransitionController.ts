import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockButtonController from "./BlockButtonController";

class BlockButtonTransitionController extends AbstractTransitionController<BlockButtonController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.add(this.getSubTimeline(this.element.querySelector('.component-button-main')));
	}
}

export default BlockButtonTransitionController;
