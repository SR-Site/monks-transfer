import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";

class DefaultSlideoutComponentTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class if it's not overwritten it will use the default transition which is a fade
	 */
	protected setupTransitionInTimeline(): void
	{
		this._transitionInTimeline.from(this.element, 0.2, {opacity: 0, display: 'none'}, 0);
	}
}

export default DefaultSlideoutComponentTransitionController;
