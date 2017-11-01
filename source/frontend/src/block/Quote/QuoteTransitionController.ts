import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class QuoteTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.quote,
			0.8,
			{
				autoAlpha: 0,
				y: 20,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Expo.easeOut,
			},
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.name,
			0.8,
			{
				autoAlpha: 0,
				y: 20,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Expo.easeOut,
			},
			'=-0.6'
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.position,
			0.8,
			{
				autoAlpha: 0,
				y: 20,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Expo.easeOut,
			},
			'=-0.6'
		);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default QuoteTransitionController;
