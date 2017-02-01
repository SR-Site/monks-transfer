import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import ButtonStartAdvertisingController from "./ButtonStartAdvertisingController";

class ButtonStartAdvertisingTransitionController extends AbstractTransitionController<ButtonStartAdvertisingController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.5, {
			autoAlpha: 0,
			ease: Power3.easeInOut
		});
	}
}

export default ButtonStartAdvertisingTransitionController;
