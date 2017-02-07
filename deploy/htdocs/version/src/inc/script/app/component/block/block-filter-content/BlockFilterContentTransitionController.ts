import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockFilterContentController from "./BlockFilterContentController";

class BlockFilterContentTransitionController extends AbstractTransitionController<BlockFilterContentController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const button = this.element.querySelector('.component-button-main');

		const paginator = this.element.querySelector('.component-paginator-dashed');

		if(button)
		{
			this.transitionInTimeline.add(this.getSubTimeline(button));
		}

		if(paginator)
		{
			this.transitionInTimeline.add(this.getSubTimeline(paginator));
		}
	}
}

export default BlockFilterContentTransitionController;
