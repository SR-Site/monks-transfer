import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import ButtonPlayCircleController from "./ButtonPlayCircleController";

class ButtonPlayCircleTransitionController extends AbstractTransitionController<ButtonPlayCircleController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 1,
			{ scale: 0, ease: Cubic.easeOut }
		);
	}
}

export default ButtonPlayCircleTransitionController;
