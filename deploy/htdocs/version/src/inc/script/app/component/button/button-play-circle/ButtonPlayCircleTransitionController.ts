import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";

class ButtonPlayCircleTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this._transitionInTimeline.from(this.element, 1,
			{ scale: 0, ease: Expo.easeOut }
		);
	}
}

export default ButtonPlayCircleTransitionController;
