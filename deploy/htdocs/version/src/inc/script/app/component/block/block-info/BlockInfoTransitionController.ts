import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockInfoController from "./BlockInfoController";

class BlockInfoTransitionController extends AbstractTransitionController<BlockInfoController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const heading = this.element.querySelector('.heading');
		const copy = this.element.querySelector('.copy');

		this.transitionInTimeline.from(this.element, 0.5, { opacity: 0, clearProps: "al" });
		this.transitionInTimeline.from(heading, 0.5, { opacity: 0, y: 100, ease: Expo.easeOut, clearProps: "al" }, '=-0.3');
		this.transitionInTimeline.from(copy, 0.5, { opacity: 0, y: 100, ease: Expo.easeOut, clearProps: "al" }, '=-0.3');
	}
}

export default BlockInfoTransitionController;
