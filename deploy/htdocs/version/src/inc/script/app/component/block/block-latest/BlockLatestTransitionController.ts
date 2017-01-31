import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";

class BlockLatestTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		let articles = Array.prototype.slice.call(this.element.querySelectorAll('[class^=component-block]'));

		articles.forEach((article, index) =>
		{
			let offset = index > 0 ? '=-2.5' : 0;

			this.transitionInTimeline.add(this.getSubTimeline(article), offset)
		})
	}
}

export default BlockLatestTransitionController;
