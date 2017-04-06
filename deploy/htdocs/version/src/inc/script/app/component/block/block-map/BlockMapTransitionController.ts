import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockMapController from "./BlockMapController";

class BlockMapTransitionController extends AbstractTransitionController<BlockMapController>
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

		this.transitionInTimeline.add(() => this.parentController.activeSlide.transitionIn());
		this.transitionInTimeline.add(this.getSubTimeline('.component-map-pagination'));
	}
}

export default BlockMapTransitionController;
