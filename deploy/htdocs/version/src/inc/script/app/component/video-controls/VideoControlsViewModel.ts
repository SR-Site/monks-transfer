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
		if(this.isPlaying())
		{
			this.controller.dispatch(VideoControlsController.PAUSE);
		}
		else
		{
			this.controller.dispatch(VideoControlsController.PLAY);
		}

		this.isPlaying(!this.isPlaying())
	}

	/**
	 * @public
	 * @method handleMuteClick
	 */
	public handleMuteClick(): void
	{
		if(this.isMuted())
		{
			this.controller.dispatch(VideoControlsController.UNMUTE);
		}
		else
		{
			this.controller.dispatch(VideoControlsController.MUTE);
		}

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
