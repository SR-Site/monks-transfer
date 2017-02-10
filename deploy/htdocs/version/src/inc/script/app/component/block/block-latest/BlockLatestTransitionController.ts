import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockLatestController from "./BlockLatestController";

class BlockLatestTransitionController extends AbstractTransitionController<BlockLatestController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const articles = Array.prototype.slice.call(this.element.querySelectorAll('[class^=component-block]'));

		this.transitionInTimeline.from(this.element.querySelector('.heading'), 0.8, {opacity: 0});

		this.transitionInTimeline.add(this.getSubTimeline('.component-button-main'), '=-0.2');

		articles.forEach((article, index) =>
		{
			let offset = index > 0 ? '=-2.5' : '=-0.5';

			this.transitionInTimeline.add(this.getSubTimeline(article), offset)
		})
	}
}

export default BlockLatestTransitionController;
