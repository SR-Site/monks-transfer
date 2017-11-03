import { AbstractTransitionController } from 'vue-transition-component';
import { Linear } from 'gsap';

class PanelContactKernelTransitionController extends AbstractTransitionController {
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
				display: 'none',
			},
			{
				autoAlpha: 1,
				display: 'block',
				ease: Linear.easeNone,
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

export default PanelContactKernelTransitionController;