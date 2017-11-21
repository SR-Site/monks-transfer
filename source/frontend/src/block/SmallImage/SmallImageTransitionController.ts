import { AbstractTransitionController } from 'vue-transition-component';

class SmallImageTransitionController extends AbstractTransitionController {
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
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				clearProps: 'all',
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

export default SmallImageTransitionController;
