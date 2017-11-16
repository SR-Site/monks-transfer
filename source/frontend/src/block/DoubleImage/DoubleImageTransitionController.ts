import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class DoubleImageTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.primaryImage,
			1,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Expo.easeOut,
			},
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.secondaryImage,
			1,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Expo.easeOut,
			},
			'=-0.8'
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

export default DoubleImageTransitionController;
