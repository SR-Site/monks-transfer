import { AbstractTransitionController } from 'vue-transition-component';
import { Linear } from 'gsap';

class FindYourAudienceCategoryTransitionController extends AbstractTransitionController {
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

		(<Array<any>>this.viewModel.$refs.item).forEach((item, index) => {
			this.transitionInTimeline.add(
				() => this.getSubTimeline(`FindYourAudienceTeaser${index}`), 1 + (index * 0.2),
			);
		});
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {
	}
}

export default FindYourAudienceCategoryTransitionController;
