import { AbstractTransitionController } from 'vue-transition-component';
import { Linear, Expo } from 'gsap';

class AudienceQuoteTransitionController extends AbstractTransitionController {
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
			this.viewModel.$refs.box,
			0.8,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Expo.easeOut,
				clearProps: 'all',
			},
			'=-0.7',
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.subHeading,
			0.8,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Expo.easeOut,
				clearProps: 'all',
			},
			'=-0.7',
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			0.8,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Expo.easeOut,
				clearProps: 'all',
			},
			'=-0.7',
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.image,
			0.8,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Expo.easeOut,
				clearProps: 'all',
			},
			'=-0.7',
		);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default AudienceQuoteTransitionController;
