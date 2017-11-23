import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class FilterContentMenuDropdownTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		if (!(<any>this.viewModel).disableTransitionIn) {
			this.transitionInTimeline.fromTo(
				this.viewModel.$el,
				0.7,
				{
					yPercent: -100,
				},
				{
					yPercent: 0,
					ease: Expo.easeInOut,
				},
			);
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default FilterContentMenuDropdownTransitionController;
