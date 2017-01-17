import IVideoOverlayOptions from "app/component/video-overlay/IVideoOverlayOptions";
import VideoOverlayViewModel from "app/component/video-overlay/VideoOverlayViewModel";
import Log from "lib/temple/util/Log";
import DefaultComponentTransitionController from "../../util/component-transition/default-component-transition/DefaultComponentTransitionController";
import VideoPlayerController from "../video-player/VideoPlayerController";
import {IVideoPlayerOptions} from "../video-player/IVideoPlayerOptions";
import VideoOverlayTransitionController from "./VideoOverlayTransitionController";
import DefaultTransitionController from "../../util/component-transition/DefaultTransitionController";

class VideoOverlayController<T, U extends IVideoOverlayOptions> extends DefaultComponentTransitionController<VideoOverlayViewModel<any, any>, IVideoOverlayOptions>
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
			DefaultTransitionController.TRANSITION_IN_START,
			this.handleTransitionInStart.bind(this)
		);

		this.transitionController.addEventListener(
			DefaultTransitionController.TRANSITION_OUT_COMPLETE,
			this.handleTransitionOutComplete.bind(this)
		);
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
			.then(() => {
				this._videoPlayer.removePlayer(this._videoPlayerOptions);
				this.viewModel.videoMuted(false);
			})


	}

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

		// always call this last
		super.destruct();
	}
}

export default VideoOverlayController;
