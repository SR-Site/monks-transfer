import { AbstractTransitionController } from 'vue-transition-component';
import { Linear } from 'gsap';

class TwitterFeedTransitionController extends AbstractTransitionController {
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
				clearProps: 'all',
			},
		);
		this.transitionInTimeline.add(this.getSubTimeline('ButtonPrevious'));
		this.transitionInTimeline.add(this.getSubTimeline('ButtonNext'));
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default TwitterFeedTransitionController;
