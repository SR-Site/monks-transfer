import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import AudioPlayerController from 'app/component/audio-player/AudioPlayerController';
import IAudioPlayerOptions from 'app/component/audio-player/IAudioPlayerOptions';

import ko = require('knockout');

class AudioPlayerViewModel extends DefaultComponentTransitionViewModel<AudioPlayerController, IAudioPlayerOptions>
{
	public isPlaying: KnockoutObservable<boolean> = ko.observable(false);
	public hasWebAudioSupport: boolean = (window['AudioContext'] || window['webkitAudioContext'] || window['mozAudioContext'] || window['msAudioContext']) !== undefined;
	public progress:KnockoutObservable<number> = ko.observable(0);

	/**
	 * @public
	 * @method handlePlayClick
	 */
	public handlePlayClick(): void
	{
		this.controller.playAudio();
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.hasWebAudioSupport = null;
		this.progress = null;
		this.isPlaying = null;

		// always call this last
		super.destruct();
	}
}

export default AudioPlayerViewModel;
