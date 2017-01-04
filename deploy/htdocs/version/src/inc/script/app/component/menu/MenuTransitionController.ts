import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";

class MenuTransitionController extends DefaultTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.element.style.transformOrigin = 'right top';

		this.transitionInTimeline.from(this.element, 0.8, {
			autoAlpha: 0,
			scaleX: 0,
			ease: Power4.easeInOut
		});
	}
}

export default MenuTransitionController;
