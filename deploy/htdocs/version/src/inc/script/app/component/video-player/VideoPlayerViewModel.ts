import AbstractComponentViewModel from 'lib/temple/component/AbstractComponentViewModel';
import VideoPlayerController from 'app/component/video-player/VideoPlayerController';
import IVideoPlayerOptions from 'app/component/video-player/IVideoPlayerOptions';

import ko = require('knockout');

class VideoPlayerViewModel extends AbstractComponentViewModel<VideoPlayerController, IVideoPlayerOptions>
{
	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default VideoPlayerViewModel;