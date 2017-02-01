import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";

class VideoOverlayTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		// Fade in the mask
		this._transitionInTimeline.from(this.element.querySelector('.mask'), 0.3, {
			opacity: 0
		});

		// Slide in the Video Player
		this._transitionInTimeline.from(this.element.querySelector('.component-video-player'), 0.5,
			{
				height: 0,
				ease: Expo.easeOut
			}
		);

		// Slide in Button Close
		this._transitionInTimeline.from(this.element.querySelector('.component-button-circle-close'), 0.5, {
			x: 100,
			ease: Expo.easeOut
		});
	}
}

export default VideoOverlayTransitionController;
