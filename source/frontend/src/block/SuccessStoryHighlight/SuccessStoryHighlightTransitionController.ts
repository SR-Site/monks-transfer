import { AbstractTransitionController } from 'vue-transition-component';
import { Linear, Expo } from 'gsap';

class SuccessStoryHighlightTransitionController extends AbstractTransitionController {
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
				clearProps: 'all',
				ease: Linear.easeNone,
			},
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.image,
			0.8,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
				clearProps: 'all',
				ease: Expo.easeOut,
			},
			'-=0.7',
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
				autoAlpha: 1,
				clearProps: 'all',
				ease: Expo.easeOut,
			},
			'-=0.7',
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
				autoAlpha: 1,
				clearProps: 'all',
				ease: Expo.easeOut,
			},
			'-=0.7',
		);
		this.transitionInTimeline.add(this.getSubTimeline('ButtonPrimary'), '-=0.7');
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default SuccessStoryHighlightTransitionController;
