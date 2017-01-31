import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";

class BlockButtonTransitionController extends AbstractTransitionController
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
