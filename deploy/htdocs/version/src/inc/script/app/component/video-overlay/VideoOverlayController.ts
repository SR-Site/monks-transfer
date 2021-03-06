import IVideoOverlayOptions from "app/component/video-overlay/IVideoOverlayOptions";
import VideoOverlayViewModel from "app/component/video-overlay/VideoOverlayViewModel";
import Log from "lib/temple/util/Log";
import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import VideoPlayerController from "../video-player/VideoPlayerController";

import VideoOverlayTransitionController from "./VideoOverlayTransitionController";
import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";
import IVideoPlayerOptions from "../video-player/IVideoPlayerOptions";
import KeyCode from "../../../lib/temple/util/key/KeyCode";
import NativeEventListener from "../../../lib/temple/event/NativeEventListener";

class VideoOverlayController extends AbstractTransitionComponentController<VideoOverlayViewModel, IVideoOverlayOptions, VideoOverlayTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.VideoOverlay');
	private _videoPlayer: VideoPlayerController;
	private _videoPlayerOptions: IVideoPlayerOptions;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		this._debug.log('Init');

		// Set the default states after creating the timeline!
		this.element.style.visibility = 'visible';
		this.element.style.display = 'none';

		this.transitionController = new VideoOverlayTransitionController(this.element, this);

		this.transitionController.addEventListener(
			AbstractTransitionController.TRANSITION_IN_START,
			this.handleTransitionInStart.bind(this)
		);

		this.transitionController.addEventListener(
			AbstractTransitionController.TRANSITION_OUT_COMPLETE,
			this.handleTransitionOutComplete.bind(this)
		);

		this.destructibles.add(new NativeEventListener(document.body, 'keyup', this.handleKeyUp));
	}

	/**
	 *  @public
	 *  @method handleCloseClick
	 */
	public handleVideoPlayerReady(controller: VideoPlayerController): void
	{
		this._videoPlayer = controller;
		this._videoPlayer.addEventListener(VideoPlayerController.ENDED, () =>
		{
			this.viewModel.isPlaying(false);

			this.hide();
		});
	}


	/**
	 * @public
	 * @method setMute
	 * @param mute
	 */
	public setMute(mute: boolean): void
	{
		this._videoPlayer.setMute(mute);
	}

	/**
	 *  @public
	 *  @method show
	 */
	public show(options: IVideoPlayerOptions): void
	{
		this._videoPlayerOptions = options;

		if(this._videoPlayer)
		{
			this._videoPlayer.initPlayer(options);
		}

		this.transitionIn()
			.then(() => this.playVideo());
	}

	/**
	 *  @public
	 *  @method hide
	 */
	public hide(): void
	{
		this.transitionOut()
			.then(() =>
			{
				this._videoPlayer.removePlayer(this._videoPlayerOptions);
				this.viewModel.videoMuted(false);
			})
	}

	/**
	 * @private
	 * @method handleKeyPress
	 */
	private handleKeyUp = (event: KeyboardEvent): void =>
	{
		if(event.keyCode == KeyCode.ESCAPE)
		{
			this.hide();
		}
	};


	/**
	 *  @private
	 *  @method playVideo
	 */
	private playVideo(): void
	{
		if(this._videoPlayer)
		{
			this.viewModel.isPlaying(true);
			this._videoPlayer.play();
		}
	}

	/**
	 * @private
	 * @method handleTransitionOutComplete
	 */
	private handleTransitionOutComplete(): void
	{
		this.element.style.display = 'none';
	}

	/**
	 * @private
	 * @method handleTransitionInStart
	 */
	private handleTransitionInStart(): void
	{
		this.element.style.display = 'block';
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		if(this._videoPlayer)
		{
			this._videoPlayer.destruct();
			this._videoPlayer = null;
		}

		this._videoPlayerOptions = null;

		// always call this last
		super.destruct();
	}
}

export default VideoOverlayController;
