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

		if (this.viewModel.hasChild('ButtonQuaternary')) {
			this.transitionInTimeline.add(this.getSubTimeline(`ButtonQuaternary`), '-=0.5');
		}

		this.transitionInTimeline.add(this.getSubTimeline(`ButtonCircleArrow`), '-=0.5');
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default FindYourAudienceCategoryTransitionController;
