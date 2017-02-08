import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockMapSecondaryController from "./BlockMapSecondaryController";

class BlockMapSecondaryTransitionController extends AbstractTransitionController<BlockMapSecondaryController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const button = this.element.querySelector('.component-button-main');

		this.transitionInTimeline.add(this.getSubTimeline(button));
	}
}

export default BlockMapSecondaryTransitionController;
