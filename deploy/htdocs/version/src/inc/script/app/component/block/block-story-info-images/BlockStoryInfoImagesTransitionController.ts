import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockStoryInfoImagesController from "./BlockStoryInfoImagesController";

class BlockStoryInfoImagesTransitionController extends AbstractTransitionController<BlockStoryInfoImagesController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 1, {
			opacity: 0,
			clearProps: "opacity"
		})
	}
}

export default BlockStoryInfoImagesTransitionController;
