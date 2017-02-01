import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";

class MenuTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this._transitionInTimeline.from(this.element, 0.8, {
			xPercent:100,
			ease: Power4.easeInOut
		});
	}
}

export default MenuTransitionController;
