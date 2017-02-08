import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";
import NotificationController from "./NotificationController";

class NotificationTransitionController extends AbstractTransitionController<NotificationController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		// Fade in the mask
		this.transitionInTimeline.from(this.element.querySelector('.mask'), 0.2, {
			opacity: 0,
			ease: Cubic.easeInOut
		});

		// Slide in the content wrapper
		this.transitionInTimeline.fromTo(this.element.querySelector('.content-wrapper'), 0.2,
			{
				opacity: 0,
				scale: 0,
				xPercent: -50,
				yPercent: -50
			},
			{
				opacity: 1,
				scale: 1,
				xPercent: -50,
				yPercent: -50,
				ease: Back.easeOut
			}
		);
	}
}

export default NotificationTransitionController;