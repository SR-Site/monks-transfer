import DefaultComponentTransitionController from "app/util/component-transition/default-component-transition/DefaultComponentTransitionController";
import AudioPlayerTransitionController from 'app/component/audio-player/AudioPlayerTransitionController';
import IAudioPlayerOptions from 'app/component/audio-player/IAudioPlayerOptions';
import AudioPlayerViewModel from 'app/component/audio-player/AudioPlayerViewModel';

import Log from "lib/temple/util/Log";
import ButtonPlayCircleController from "../button/button-play-circle/ButtonPlayCircleController";

class AudioPlayerController extends DefaultComponentTransitionController<AudioPlayerViewModel, IAudioPlayerOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.AudioPlayer');

	private _wavesurfer: WaveSurfer;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new AudioPlayerTransitionController(this.element, this);
	}

	/**
	 * @public
	 * @method handleButtonPlayCircleReady
	 */
	public handleButtonPlayCircleReady(controller: ButtonPlayCircleController): void
	{
		this.applyThreeWayBinding(controller.isPlaying, this.viewModel.isPlaying);
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 * @description In the parent class we want this method to create the new transitionController instance because
	 * it means all the sub-components are loaded and we are ready to go!
	 */
	protected allComponentsLoaded(): void
	{
		let height = (<HTMLElement>this.element.querySelector('.component-button-play-circle')).offsetHeight;

		this._wavesurfer = WaveSurfer.create({
			container: <HTMLElement>this.element.querySelector('.wave-form'),
			waveColor: '#003057',
			progressColor: '#009bdb',
			height: height,
			barWidth: 1,
			cursorWidth: 0,
			interact: false,
			normalize: true
		});

		this._wavesurfer.load(this.options.file)
	}


	/**
	 * @public
	 * @method playAudio
	 */
	public playAudio(): void
	{
		this._wavesurfer.playPause();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default AudioPlayerController;
