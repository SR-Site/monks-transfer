import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class FreeTextTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.from(
			this.viewModel.$refs.htmlContent,
			0.8,
			{
				y: 50,
				autoAlpha: 0,
				ease: Expo.easeOut,
			},
		);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {
	}
}

export default FreeTextTransitionController;
