import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class VideoOverlayTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.from(this.viewModel.$el, 0.1, {
			autoAlpha: 0,
		});

		this.transitionInTimeline.from(this.viewModel.$refs.content, 0.4, {
			height: 0,
			ease: Expo.easeOut,
		});
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {
		this.transitionOutTimeline.to(
			this.viewModel.$el,
			0.2,
			{
				autoAlpha: 0,
			},
			0,
		);
	}
}

export default VideoOverlayTransitionController;
