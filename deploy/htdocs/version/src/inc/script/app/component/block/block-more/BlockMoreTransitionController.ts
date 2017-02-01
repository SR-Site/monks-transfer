import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";

class BlockMoreTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		let articles = Array.prototype.slice.call(this.element.querySelectorAll('[class^=component-block]'));

		this.transitionInTimeline.from(this.element.querySelector('.header'), 1, { y: 50, opacity: 0, ease: Expo.easeOut });

		articles.forEach((article, index) =>
		{
			let offset = index > 0 ? '=-2.5' : '=-0.8';

			this.transitionInTimeline.add(this.getSubTimeline(article), offset)
		})
	}
}

export default BlockMoreTransitionController;
