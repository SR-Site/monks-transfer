import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import VideoControlsController from 'app/component/video-controls/VideoControlsController';
import IVideoControlsOptions from 'app/component/video-controls/IVideoControlsOptions';

import ko = require('knockout');

class VideoControlsViewModel extends AbstractTransitionComponentViewModel<VideoControlsController, IVideoControlsOptions>
{
	public isPlaying: KnockoutObservable<boolean> = ko.observable(false);
	public isMuted: KnockoutObservable<boolean> = ko.observable(false);
	public isActive: KnockoutObservable<boolean> = ko.observable(false);
	public progress: KnockoutObservable<number> = ko.observable(0);

	/**
	 * @public
	 * @method handlePlayClick
	 */
	public handlePlayClick(): void
	{
		this.controller.dispatch(this.isPlaying() ? VideoControlsController.PAUSE : VideoControlsController.PLAY);
	}

	/**
	 * @public
	 * @method handleMuteClick
	 */
	public handleMuteClick(): void
	{
		this.controller.dispatch(this.isMuted() ? VideoControlsController.UNMUTE : VideoControlsController.MUTE);

		this.isMuted(!this.isMuted())
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.isPlaying = null;
		this.isMuted = null;
		this.progress = null;

		// always call this last
		super.destruct();
	}
}

export default VideoControlsViewModel;
