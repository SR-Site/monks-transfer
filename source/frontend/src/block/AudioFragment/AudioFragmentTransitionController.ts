import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class AudioFragmentTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			1,
			{
				opacity: 0,
				y: 50,
			},
			{
				opacity: 1,
				y: 0,
				ease: Expo.easeOut,
			},
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.details,
			1,
			{
				opacity: 0,
				y: 50,
			},
			{
				opacity: 1,
				y: 0,
				ease: Expo.easeOut,
			},
			'-=0.8',
		);

		this.transitionInTimeline.add(this.getSubTimeline('AudioPlayer'), '-=0.8');
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default AudioFragmentTransitionController;
