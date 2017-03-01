import AbstractTransitionController from "app/util/component-transition/AbstractTransitionController";
import SlideHorizontalWithoutIconController from "./SlideHorizontalWithoutIconController";

class SlideHorizontalWithoutIconTransitionController extends AbstractTransitionController<SlideHorizontalWithoutIconController>
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

export default SlideHorizontalWithoutIconTransitionController;
