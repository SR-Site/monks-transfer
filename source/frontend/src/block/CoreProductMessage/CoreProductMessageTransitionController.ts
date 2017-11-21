import { AbstractTransitionController } from 'vue-transition-component';
import { Linear, Expo } from 'gsap';

class CoreProductMessageTransitionController extends AbstractTransitionController {
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
			this.viewModel.$refs.header,
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
			'=-0.7',
		);
		(<Array<HTMLElement>>this.viewModel.$refs.item).forEach(element => {
			this.transitionInTimeline.fromTo(
				element,
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
				'=-0.7',
			);
		});
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default CoreProductMessageTransitionController;
