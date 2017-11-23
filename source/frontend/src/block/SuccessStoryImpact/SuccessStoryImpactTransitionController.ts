import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class SuccessStoryImpactTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			0.8,
			{
				opacity: 0,
			},
			{
				opacity: 1,
			},
		);

		(<Array<HTMLElement>>this.viewModel.$refs.statistic).forEach(element => {
			this.transitionInTimeline.fromTo(
				element,
				0.8,
				{
					autoAlpha: 0,
					y: 50,
				},
				{
					autoAlpha: 1,
					y: 0,
					ease: Expo.easeOut,
				},
				'-=0.6',
			);
		});
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default SuccessStoryImpactTransitionController;
