import { AbstractTransitionController } from 'vue-transition-component';
import { Linear, Expo } from 'gsap';

class SlideoutPanelTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.mask,
			0.2,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				ease: Linear.easeNone,
			},
			0
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.panel,
			0.5,
			{
				xPercent: 100,
			},
			{
				xPercent: 0,
				ease: Expo.easeInOut,
			},
			0
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

export default SlideoutPanelTransitionController;
