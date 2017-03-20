import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";
import HeaderController from "./HeaderController";

class HeaderTransitionController extends AbstractTransitionController<HeaderController>
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

export default HeaderTransitionController;
