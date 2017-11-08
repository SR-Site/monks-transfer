import { AbstractTransitionController } from 'vue-transition-component';
import { Expo, Power3 } from 'gsap';

class SiteMenuTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.set(this.viewModel.$el, { x: 0 });
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.menuBackground,
			1.2,
			{
				xPercent: 100,
				yPercent: -100,
				rotation: -45,
			},
			{
				xPercent: 0,
				yPercent: 0,
				rotation: 0,
				ease: Power3.easeOut,
			},
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.menuContent,
			1.2,
			{
				xPercent: 50,
				autoAlpha: 0,
			},
			{
				xPercent: 0,
				autoAlpha: 1,
				ease: Expo.easeOut
			},
			'=-0.8'
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

export default SiteMenuTransitionController;
