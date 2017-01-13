import DefaultTransitionController from "../../util/component-transition/DefaultTransitionController";

class DefaultSlideoutComponentTransitionController extends DefaultTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class if it's not overwritten it will use the default transition which is a fade
	 */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.2, {opacity: 0, display: 'none'}, 0);
	}
}

export default DefaultSlideoutComponentTransitionController;
