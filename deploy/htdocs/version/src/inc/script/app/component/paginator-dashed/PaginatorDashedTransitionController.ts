import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";

class PaginatorDashedTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this._transitionInTimeline.from(this.element, 1, {
			opacity: 0
		})
	}
}

export default PaginatorDashedTransitionController;
