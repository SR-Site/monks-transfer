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

		this.transitionInTimeline.add(this.getSubTimeline('TopPicks'), '-=0.7');

		if (this.viewModel.$refs.genre) {
			(<any>this.viewModel.$refs.genre).forEach(genre => {
				this.transitionInTimeline.add(this.getSubTimeline(genre), '-=0.7');
			});
		}

		this.transitionInTimeline.add(this.getSubTimeline('Networks'), '-=0.7');
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default FindYourAudienceTransitionController;
