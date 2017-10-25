import { AbstractTransitionController } from 'vue-transition-component';
import { Cubic } from 'gsap';

class ButtonCirclePlayTransitionController extends AbstractTransitionController {
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
				scale: 0,
			},
			{
				scale: 1,
				ease: Cubic.easeOut,
			},
		);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default ButtonCirclePlayTransitionController;
