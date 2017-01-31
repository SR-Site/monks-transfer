import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";

class BlockSmallImageTransitionController extends DefaultTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element.querySelector('img'), 2,
			{
				opacity: 0,
				clearProps: "opacity"
			}
		);
	}
}

export default BlockSmallImageTransitionController;
