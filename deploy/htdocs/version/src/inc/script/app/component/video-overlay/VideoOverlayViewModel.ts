import VideoOverlayController from 'app/component/video-overlay/VideoOverlayController';
import IVideoOverlayOptions from 'app/component/video-overlay/IVideoOverlayOptions';

import ko = require('knockout');
import DefaultComponentTransitionViewModel from "../../util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";

class VideoOverlayViewModel<T, U extends IVideoOverlayOptions> extends DefaultComponentTransitionViewModel<VideoOverlayController<any, any>, IVideoOverlayOptions>
{
	public videoMuted:KnockoutObservable<boolean> = ko.observable(false);
	public isPlaying:KnockoutObservable<boolean>  = ko.observable(false);

	/**
	 *  @public
	 *  @method handleCloseClick
	 */
	public handleCloseClick():void
	{
		this.controller.hide();
	}

	/**
	 * @public
	 * @Method handleMuteVideoClick
	 */
	public handleMuteVideoClick():void
	{
		if(this.videoMuted())
		{
			this.controller.setMute(false);
			this.videoMuted(false);
		}
		else
		{
			this.controller.setMute(true);
			this.videoMuted(true);
		}
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.videoMuted = null;
		this.isPlaying = null;

		// always call this last
		super.destruct();
	}
}

export default VideoOverlayViewModel;
