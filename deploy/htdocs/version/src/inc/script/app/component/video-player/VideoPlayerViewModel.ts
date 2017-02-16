import AbstractComponentViewModel from 'lib/temple/component/AbstractComponentViewModel';
import VideoPlayerController from 'app/component/video-player/VideoPlayerController';
import IVideoPlayerOptions from 'app/component/video-player/IVideoPlayerOptions';

import ko = require('knockout');
import MouseEventHelper from "../../util/MouseEventHelper";

class VideoPlayerViewModel extends AbstractComponentViewModel<VideoPlayerController, IVideoPlayerOptions>
{
	public MouseEventHelper: Class = MouseEventHelper;

	public _mouseMoveTimeout: number;

	/**
	 * @public
	 * @method handleMouseEnter
	 */
	public handleMouseMove(): void
	{
		this.controller.setControlVisibility(true);

		clearTimeout(this._mouseMoveTimeout);

		this._mouseMoveTimeout = setTimeout(() =>
		{
			this.controller.setControlVisibility(false);
		}, 2000);
	}

	/**
	 * @public
	 * @method handleMouseLeave
	 */
	public handleMouseLeave(): void
	{
		this.controller.setControlVisibility(false);
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		clearTimeout(this._mouseMoveTimeout);

		this.MouseEventHelper = null;
		this._mouseMoveTimeout = null;

		// always call this last
		super.destruct();
	}
}

export default VideoPlayerViewModel;