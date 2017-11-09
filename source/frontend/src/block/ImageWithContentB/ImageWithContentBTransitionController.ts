import { AbstractTransitionController } from 'vue-transition-component';
import { Expo, Linear } from 'gsap';

class ImageWithContentBTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.image,
			0.8,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				ease: Linear.easeNone,
			},
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.background,
			0.8,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				ease: Expo.easeOut,
			},
			0
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
			},
			'=-0.5',
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.copy,
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
			'=-0.5',
		);
		if (this.viewModel.hasChild('ButtonPrimary')) {
			this.transitionInTimeline.add(this.getSubTimeline('ButtonPrimary'), '=-0.5');
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {
	}
}

export default ImageWithContentBTransitionController;
