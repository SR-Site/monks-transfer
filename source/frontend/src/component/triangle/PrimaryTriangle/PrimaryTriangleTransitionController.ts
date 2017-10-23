import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class PrimaryTriangleTransitionController extends AbstractTransitionController {
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
				xPercent: -200,
				yPercent: 100,
			},
			{
				xPercent: 0,
				yPercent: 0,
				clearProps: 'x, y',
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
		this.transitionOutTimeline.to(this.viewModel.$el, 1, {
			xPercent: 200,
			yPercent: -100,
			ease: Expo.easeIn,
		});
	}
}

export default PrimaryTriangleTransitionController;
