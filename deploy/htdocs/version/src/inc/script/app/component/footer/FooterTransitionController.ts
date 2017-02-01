import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";
import FooterController from "./FooterController";

class FooterTransitionController extends AbstractTransitionController<FooterController>
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

export default FooterTransitionController;
