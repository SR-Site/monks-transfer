import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class AudioPlayerTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.add(this.getSubTimeline('ButtonCirclePlay'));

		const element = <HTMLElement>this.viewModel.$refs.waveForm;
		const width = element.offsetWidth;
		const height = element.offsetHeight;

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.waveForm,
			2,
			{
				clip: `rect(0, 0, ${width}px, 0)`,
			},
			{
				clip: `rect(0, ${width}px, ${height}px, 0)`,
				clearProps: 'clip',
				ease: Expo.easeOut,
			},
			'-=0.2',
		);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default AudioPlayerTransitionController;
