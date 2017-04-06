import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import AudioPlayerTransitionController from 'app/component/audio-player/AudioPlayerTransitionController';
import IAudioPlayerOptions from 'app/component/audio-player/IAudioPlayerOptions';
import AudioPlayerViewModel from 'app/component/audio-player/AudioPlayerViewModel';

import Log from "lib/temple/util/Log";
import ButtonPlayCircleController from "../button/button-play-circle/ButtonPlayCircleController";
import AudioElement from "../../../lib/temple/util/AudioElement";
import MediaElement from "../../../lib/temple/util/MediaElement";
import {trackEvent} from "../../util/Analytics";

class AudioPlayerController extends AbstractTransitionComponentController<AudioPlayerViewModel, IAudioPlayerOptions, AudioPlayerTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.AudioPlayer');

	private _wavesurfer: WaveSurfer;
	private _fallbackPlayer: AudioElement;

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
		if(this.viewModel.hasWebAudioSupport)
		{
			this.createWaveSurfer();
		}
		else
		{
			this.createFallbackPlayer();
		}
	}

	/**
	 * @public
	 * @method playAudio
	 */
	public playAudio(): void
	{
		if(this.viewModel.hasWebAudioSupport)
		{
			this._wavesurfer.playPause();

			this.viewModel.isPlaying(this._wavesurfer.isPlaying());
		}
		else
		{
			if(this.viewModel.isPlaying())
			{
				this._fallbackPlayer.pause();
				this.viewModel.isPlaying(false);
			}
			else
			{
				this._fallbackPlayer.play();
				this.viewModel.isPlaying(true);
			}
		}

		if(this.viewModel.isPlaying())
		{
			trackEvent('audioFragment', 'click', 'play|' + this.options.title);
		}
		else
		{
			const webAudioSupport = this.viewModel.hasWebAudioSupport;
			const currentTime = webAudioSupport ? this._wavesurfer.getCurrentTime() : this._fallbackPlayer.currentTime;
			const duration = webAudioSupport ? this._wavesurfer.getDuration() : this._fallbackPlayer.duration;

			trackEvent('audioFragment', 'click', 'pause|' + this.options.title, Math.round(currentTime / duration * 100));
		}
	}

	/**
	 * @private
	 * @method createFallbackPlayer
	 */
	private createFallbackPlayer(): void
	{
		this._fallbackPlayer = new AudioElement();
		this._fallbackPlayer.setSrc(this.options.file);
		this._fallbackPlayer.addEventListener(MediaElement.EVENT_TIMEUPDATE, () =>
		{
			this.viewModel.progress(this._fallbackPlayer.currentTime / this._fallbackPlayer.duration);
		})
	}

	/**
	 * @private
	 * @method createWaveSurfer
	 */
	private createWaveSurfer(): void
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
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		if(this._wavesurfer)
		{
			this._wavesurfer.destroy();
			this._wavesurfer = null;
		}

		this._fallbackPlayer = null;

		// always call this last
		super.destruct();
	}
}

export default AudioPlayerController;
