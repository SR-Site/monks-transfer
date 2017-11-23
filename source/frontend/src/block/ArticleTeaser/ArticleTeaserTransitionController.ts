import { AbstractTransitionController } from 'vue-transition-component';
import { Expo, Linear } from 'gsap';

class ArticleTeaserTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const el = this.viewModel.$el;

		this.transitionInTimeline.fromTo(
			el,
			0.5,
			{
				opacity: 0,
			},
			{
				opacity: 1,
			},
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.description,
			1.6,
			{
				xPercent: -100,
			},
			{
				xPercent: 0,
				clearProps: 'xPercent',
				ease: Expo.easeOut,
			},
		);

		if (this.viewModel.$refs.tags) {
			this.transitionInTimeline.fromTo(
				this.viewModel.$refs.tags,
				1,
				{
					autoAlpha: 0,
					x: -25,
				},
				{
					autoAlpha: 1,
					x: 0,
					ease: Expo.easeOut,
				},
				0.2,
			);
		}

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			1,
			{
				opacity: 0,
				x: -25,
			},
			{
				opacity: 1,
				x: 0,
				ease: Expo.easeOut,
				clearProps: 'opacity',
			},
			0.2,
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.copy,
			1,
			{
				opacity: 0,
				x: -25,
			},
			{
				opacity: 1,
				x: 0,
				ease: Expo.easeOut,
				clearProps: 'opacity',
			},
			0.2,
		);

		this.transitionInTimeline.add(this.getSubTimeline('ButtonQuaternary'), 0.2);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default ArticleTeaserTransitionController;
