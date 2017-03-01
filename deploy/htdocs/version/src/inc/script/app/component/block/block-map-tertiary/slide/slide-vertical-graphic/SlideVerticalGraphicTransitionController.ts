import AbstractTransitionController from "app/util/component-transition/AbstractTransitionController";
import SlideVerticalGraphicController from "./SlideVerticalGraphicController";

class SlideVerticalGraphicTransitionController extends AbstractTransitionController<SlideVerticalGraphicController>
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
			ease: Linear.easeNone
		});
	}
}

export default SlideVerticalGraphicTransitionController;
