import { AbstractTransitionController } from 'vue-transition-component';
import { Expo, Linear } from 'gsap';

class ImageWithContentTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const image = <HTMLElement>this.viewModel.$refs.image;
		const width = image.offsetWidth;
		const height = image.offsetHeight;

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.content,
			2,
			{
				xPercent: -100,
				autoAlpha: 0,
			},
			{
				xPercent: 0,
				autoAlpha: 1,
				clearProps: 'all',
				ease: Expo.easeOut,
			},
		);

		this.transitionInTimeline.fromTo(
			image,
			2,
			{
				clip: `rect(0, 0, ${height}, 0)`,
				opacity: 0,
			},
			{
				clip: `rect(0, ${width}, ${height}, 0)`,
				opacity: 1,
				clearProps: 'clip',
				ease: Expo.easeOut,
			},
			0,
		);
		if (this.viewModel.hasChild('ButtonPrimary')) {
			this.transitionInTimeline.add(this.getSubTimeline('ButtonPrimary'), 1.5);
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default ImageWithContentTransitionController;
