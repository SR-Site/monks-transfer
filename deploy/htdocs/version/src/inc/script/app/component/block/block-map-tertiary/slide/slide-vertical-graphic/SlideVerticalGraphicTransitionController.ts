import AbstractTransitionController from "app/util/component-transition/AbstractTransitionController";
import SlideVerticalGraphicController from "./SlideVerticalGraphicController";

class SlideVerticalGraphicTransitionController extends AbstractTransitionController<SlideVerticalGraphicController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.5, {
			autoAlpha: 0,
			display: 'none',
			ease: Linear.easeNone
		});

		// this.transitionInTimeline.from(this.element.querySelector('.heading-07'), 0.8, {
		// 	y: 50,
		// 	autoAlpha: 0,
		// 	ease: Cubic.easeInOut
		// });
		//
		// this.transitionInTimeline.from(this.element.querySelector('.copy-03'), 0.8, {
		// 	y: 50,
		// 	autoAlpha: 0,
		// 	ease: Cubic.easeInOut
		// }, '=-0.5');
		//
		// this.transitionInTimeline.from(this.element.querySelector('.slide-title'), 0.8, {
		// 	y: 50,
		// 	autoAlpha: 0,
		// 	ease: Cubic.easeInOut
		// }, '=-0.5');
	}
}

export default SlideVerticalGraphicTransitionController;
