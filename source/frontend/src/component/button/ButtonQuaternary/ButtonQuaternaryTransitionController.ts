import { AbstractTransitionController } from 'vue-transition-component';
import { Linear } from 'gsap';

class ButtonQuaternaryTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		// this.transitionInTimeline.fromTo(
		// 	this.viewModel.$el,
		// 	0.2,
		// 	{
		// 		autoAlpha: 0,
		// 	},
		// 	{
		// 		autoAlpha: 1,
		// 		clearProps: 'all',
		// 		ease: Linear.easeNone,
		// 	},
		// );
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default ButtonQuaternaryTransitionController;
