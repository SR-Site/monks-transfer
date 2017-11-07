import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class TargetAudienceTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			0.8,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
				ease: Expo.easeOut,
			},
		);

		(<Array<HTMLElement>>this.viewModel.$refs.device).forEach((element) => {
			this.transitionInTimeline.fromTo(
				element,
				0.8,
				{
					autoAlpha: 0,
				},
				{
					autoAlpha: 1,
					ease: Expo.easeOut,
				},
				'=-0.7'
			);
		});

		this.transitionInTimeline.add(this.getSubTimeline('ScrollBar'), 0.2);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default TargetAudienceTransitionController;
