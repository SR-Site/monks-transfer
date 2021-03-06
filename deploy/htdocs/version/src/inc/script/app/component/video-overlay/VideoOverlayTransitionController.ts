import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";
import VideoOverlayController from "./VideoOverlayController";

class VideoOverlayTransitionController extends AbstractTransitionController<VideoOverlayController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		// Fade in the mask
		this.transitionInTimeline.from(this.element.querySelector('.mask'), 0.3, {
			opacity: 0
		});

		// Slide in the Video Player
		this.transitionInTimeline.from(this.element.querySelector('.component-video-player'), 0.5,
			{
				height: 0,
				ease: Expo.easeOut
			}
		);

		// Slide in Button Close
		this.transitionInTimeline.from(this.element.querySelector('.component-button-circle-close'), 0.5, {
			scale: 0,
			ease: Expo.easeOut
		});
	}
}

export default VideoOverlayTransitionController;
