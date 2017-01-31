import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";

class PaginatorDashedTransitionController extends DefaultTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 1, {
			opacity: 0
		})
	}
}

export default PaginatorDashedTransitionController;
