import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import AudioPlayerController from 'app/component/audio-player/AudioPlayerController';
import IAudioPlayerOptions from 'app/component/audio-player/IAudioPlayerOptions';

import ko = require('knockout');

class AudioPlayerViewModel extends DefaultComponentTransitionViewModel<AudioPlayerController, IAudioPlayerOptions>
{
	public isPlaying:KnockoutObservable<boolean> = ko.observable(false);

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

		// always call this last
		super.destruct();
	}
}

export default AudioPlayerViewModel;
