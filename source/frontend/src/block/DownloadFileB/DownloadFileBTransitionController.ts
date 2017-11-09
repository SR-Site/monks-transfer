import { AbstractTransitionController } from 'vue-transition-component';
import { Expo, Linear } from 'gsap';

class DownloadFileBTransitionController extends AbstractTransitionController {
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
			'=-0.5'
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.fileDescription,
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
			'=-0.5',
		);
		this.transitionInTimeline.fromTo(
			(<any>this.viewModel.$refs.button).$el,
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
			'=-0.5',
		);

	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {
	}
}

export default DownloadFileBTransitionController;
