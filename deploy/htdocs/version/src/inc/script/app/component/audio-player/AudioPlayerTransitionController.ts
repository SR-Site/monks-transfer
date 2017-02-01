import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";
import AudioPlayerController from "./AudioPlayerController";

class AudioPlayerTransitionController extends AbstractTransitionController<AudioPlayerController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const waveForm = <HTMLElement>this.element.querySelector('.wave-form');

		this.transitionInTimeline.add(this.getSubTimeline(this.element.querySelector('.component-button-play-circle')));

		this.transitionInTimeline.fromTo(waveForm, 2,
			{
				clip: 'rect(' + 0 + ', ' + 0 + ',' + waveForm.offsetHeight + ', ' + 0 + ')'
			},
			{
				clip: 'rect(' + 0 + ', ' + waveForm.offsetWidth + ',' + waveForm.offsetHeight + ', ' + 0 + ')',
				clearProps: "clip",
				ease: Expo.easeOut
			}, '=-0.2');
	}
}

export default AudioPlayerTransitionController;
