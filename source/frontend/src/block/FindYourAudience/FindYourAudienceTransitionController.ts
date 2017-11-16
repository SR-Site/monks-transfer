import { AbstractTransitionController } from 'vue-transition-component';
import { Linear } from 'gsap';

class FindYourAudienceTransitionController extends AbstractTransitionController {
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

		this.transitionInTimeline.add(() => this.getSubTimeline('TopPicks'), 0.8);
		this.transitionInTimeline.add(() => this.getSubTimeline('Series'), 1);
		this.transitionInTimeline.add(() => this.getSubTimeline('AwardsAndSpecials'), 1.2);
		this.transitionInTimeline.add(() => this.getSubTimeline('Sports'), 1.4);
		this.transitionInTimeline.add(() => this.getSubTimeline('Networks'), 1.6);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {
	}
}

export default FindYourAudienceTransitionController;
