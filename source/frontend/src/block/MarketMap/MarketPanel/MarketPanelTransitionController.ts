import { AbstractTransitionController } from 'vue-transition-component';
import {Expo, Linear} from "gsap";

class MarketPanelTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(this.viewModel.$el, 0.1, { autoAlpha: 0 }, { autoAlpha: 1 });
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.mask,
			0.2,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				ease: Linear.easeNone,
			},
			0,
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.panel,
			0.5,
			{
				xPercent: 100,
			},
			{
				xPercent: 0,
				ease: Expo.easeInOut,
			},
			0,
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.label,
			0.2,
			{
				xPercent: 0,
			},
			{
				xPercent: -100,
				ease: Expo.easeInOut,
			},
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

export default MarketPanelTransitionController;
