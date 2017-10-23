import { AbstractTransitionController } from 'vue-transition-component';
import { Expo, Linear } from 'gsap';

class ImageWithContentTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const width = (<HTMLElement>this.viewModel.$refs.siteFrame).offsetWidth;
		const height = (<HTMLElement>this.viewModel.$refs.siteFrame).offsetHeight;

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.content,
			2,
			{
				xPercent: -100,
			},
			{
				xPercent: 0,
				clearProps: 'all',
				ease: Expo.easeOut,
			},
		);

		this.transitionInTimeline.fromTo(
			(<any>this.viewModel.$refs.image).$el,
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

		this.transitionInTimeline.from(
			this.viewModel.$refs.heading,
			0.8,
			{
				opacity: 0,
				ease: Linear.easeNone,
			},
			1.1,
		);

		this.transitionInTimeline.from(
			this.viewModel.$refs.copy,
			0.8,
			{
				opacity: 0,
				ease: Linear.easeNone,
			},
			1.3,
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
