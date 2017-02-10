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
		this.transitionInTimeline.from(this.element, 0.8, {
			opacity: 0,
			ease: Linear.easeNone
		});

		const button = this.element.querySelector('.component-button-main');

		this.transitionInTimeline.add(this.getSubTimeline(button));
	}
}

export default BlockMapSecondaryTransitionController;
