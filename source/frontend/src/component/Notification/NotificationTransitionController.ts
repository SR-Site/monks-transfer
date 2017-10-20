import { AbstractTransitionController } from 'vue-transition-component';
import { Bounce } from 'gsap';

class NotificationTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.from(this.viewModel.$el, 0.1, {
			autoAlpha: 0,
		});

		this.transitionInTimeline.from(this.viewModel.$refs['content'], 0.4, {
			scale: 0,
			ease: Bounce.easeOut,
		});
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionOutTimeline(): void {
		this.transitionOutTimeline.to(
			this.viewModel.$el,
			0.2,
			{
				autoAlpha: 0,
			},
			0,
		);
	}
}

export default NotificationTransitionController;
