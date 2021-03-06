import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";
import PaginatorDashedController from "./PaginatorDashedController";

class PaginatorDashedTransitionController extends AbstractTransitionController<PaginatorDashedController>
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
