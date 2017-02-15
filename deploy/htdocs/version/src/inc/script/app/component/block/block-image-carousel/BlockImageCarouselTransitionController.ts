import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockImageCarouselController from "./BlockImageCarouselController";

class BlockImageCarouselTransitionController extends AbstractTransitionController<BlockImageCarouselController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const pagination = this.element.querySelector('.pagination');
		const mobilePagination = this.element.querySelector('.component-paginator-dashed');

		this.transitionInTimeline.from(this.element.querySelector('.slider-viewport'), 1, {
			opacity: 0
		});

		this.transitionInTimeline.add(this.getSubTimeline(mobilePagination));
	}
}

export default BlockImageCarouselTransitionController;
