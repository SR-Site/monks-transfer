import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class SmallInfoTransitionController extends AbstractTransitionController {
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
			'=+0.5',
		);

		if (this.viewModel.$refs.copy) {
			this.transitionInTimeline.fromTo(
				this.viewModel.$refs.copy,
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
				'=-0.7',
			);
		}

		if (this.viewModel.hasChild('ButtonPrimary')) {
			this.transitionInTimeline.add(this.getSubTimeline('ButtonPrimary'), '=-0.7');
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default SmallInfoTransitionController;
