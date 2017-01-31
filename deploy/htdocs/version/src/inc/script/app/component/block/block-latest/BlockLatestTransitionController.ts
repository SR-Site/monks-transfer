import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";

class BlockLatestTransitionController extends DefaultTransitionController
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

			this.transitionInTimeline.add(this.getSubTimeline(article), '=-2.5')
		})
	}
}

export default BlockLatestTransitionController;
