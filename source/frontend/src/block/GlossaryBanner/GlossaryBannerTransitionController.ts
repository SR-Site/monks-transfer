import { AbstractTransitionController } from 'vue-transition-component';
import { Linear, Expo } from 'gsap';

class GlossaryBannerTransitionController extends AbstractTransitionController {
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

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			0.8,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				clearProps: 'all',
				autoAlpha: 1,
				ease: Expo.easeOut,
			},
			'=-0.6',
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.copy,
			0.8,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				clearProps: 'all',
				autoAlpha: 1,
				ease: Expo.easeOut,
			},
			'=-0.6',
		);

		if (this.viewModel.hasChild('ButtonPrimary')) {
			this.transitionInTimeline.add(() => this.getSubTimeline('ButtonPrimary'));
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default GlossaryBannerTransitionController;
