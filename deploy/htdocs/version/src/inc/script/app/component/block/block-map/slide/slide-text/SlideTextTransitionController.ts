import AbstractTransitionController from "app/util/component-transition/AbstractTransitionController";
import SlideTextController from "./SlideTextController";

class SlideTextTransitionController extends AbstractTransitionController<SlideTextController>
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
			display: 'none',
			ease: Linear.easeNone
		});
	}
}

export default SlideTextTransitionController;
