import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class SecondaryTriangleTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			2,
			{
				x: window.innerWidth,
				y: -window.innerWidth,
			},
			{
				x: 0,
				y: 0,
				ease: Expo.easeOut,
			}
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

export default SecondaryTriangleTransitionController;
