import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";

class ButtonPlayCircleTransitionController extends DefaultTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 1,
			{ scale: 0, ease: Expo.easeOut }
		);
	}
}

export default ButtonPlayCircleTransitionController;
