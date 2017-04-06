import AbstractTransitionController from "app/util/component-transition/AbstractTransitionController";
import SlideVerticalListController from "./SlideVerticalListController";

class SlideVerticalListTransitionController extends AbstractTransitionController<SlideVerticalListController>
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

export default SlideVerticalListTransitionController;
