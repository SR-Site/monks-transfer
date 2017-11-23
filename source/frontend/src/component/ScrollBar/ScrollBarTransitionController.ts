import { AbstractTransitionController } from 'vue-transition-component';
import { Back, Linear } from 'gsap';

class ScrollBarTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			1,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				ease: Linear.easeNone,
			},
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.knob,
			0.5,
			{
				scale: 0.5,
				autoAlpha: 0,
			},
			{
				scale: 1,
				autoAlpha: 1,
				ease: Back.easeOut,
			},
			0.5,
		);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default ScrollBarTransitionController;
