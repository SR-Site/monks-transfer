import { AbstractTransitionController } from 'vue-transition-component';
import { TweenLite, Expo } from 'gsap';
import MorphSVGPlugin from 'vendor/gsap/plugin/MorphSVGPlugin';

class GlossaryItemTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}

	/**
	 * @public
	 * @method unlock
	 * @description Unlock the icon
	 */
	public unlock() {
		MorphSVGPlugin;

		TweenLite.to(this.viewModel.$refs.lock, 0.8, {
			ease: Expo.easeInOut,
			morphSVG: {
				shape: this.viewModel.$refs.check,
			},
		});
	}
}

export default GlossaryItemTransitionController;
