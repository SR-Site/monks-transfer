import AbstractComponentController from "lib/temple/component/AbstractComponentController";
import IVideoPlayerOptions from "app/component/video-player/IVideoPlayerOptions";
import VideoPlayerViewModel from "app/component/video-player/VideoPlayerViewModel";
import Log from "lib/temple/util/Log";
import VideoPlayer from "../../util/video/VideoPlayer";
import VideoType from "../../data/enum/type/VideoType";
import VideoElement from "../../../lib/temple/util/VideoElement";
import NativeEventListener from "../../../lib/temple/event/NativeEventListener";
import ThrottleDebounce from "../../../lib/temple/util/ThrottleDebounce";
import ElementResizer, {ScaleMode} from "../../../lib/temple/util/ui/ElementResizer";
import Promise = require("bluebird");
import bowser = require('bowser');
import VideoControlsController from "../video-controls/VideoControlsController";
import DataEvent from "../../../lib/temple/event/DataEvent";

class VideoPlayerController extends AbstractComponentController<VideoPlayerViewModel, IVideoPlayerOptions>
{
	public static ENDED: string = 'VideoPlayerController.ENDED';
	public static TIME_UPDATE: string = 'VideoPlayerController.TIME_UPDATE';

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.VideoPlayer');

	/**
	 * The video player object
	 */
	private _videoPlayer: Vimeo.Player|VideoPlayer;
	private _videoControls: VideoControlsController;
	private _enableCustomControls:boolean = false;


	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		this._debug.log('Init');

		this.destructibles.add(new NativeEventListener(window, 'resize', ThrottleDebounce.debounce(this.handleResize, 250, this)));

		if(this.options.video)
		{
			this.initPlayer();
		}
	}

	public handleVideoControlsReady(controller: VideoControlsController): void
	{
		this._videoControls = controller;

		controller.addEventListener(VideoControlsController.PAUSE, this.pause.bind(this));
		controller.addEventListener(VideoControlsController.PLAY, this.play.bind(this));
		controller.addEventListener(VideoControlsController.MUTE, this.setMute.bind(this, true));
		controller.addEventListener(VideoControlsController.UNMUTE, this.setMute.bind(this, false));
		controller.addEventListener(VideoControlsController.SEEK, (event: DataEvent<{progress: number}>) =>
		{
			this._videoPlayer.getDuration()
				.then((duration) => this.setCurrentTime(duration * event.data.progress));
		});
	}

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method initPlayer
	 */
	public initPlayer(options: IVideoPlayerOptions = this.options): void
	{
		this.options = options;

		switch(options.video.type)
		{
			case VideoType.INTERNAL:
			{
				this.createInternalVideoPlayer();

				break;
			}
			case VideoType.VIMEO:
			{
				this.createVimeoPlayer();

				break;
			}
			default:
			{
				console.error('[BlockHeroVideoSimpleController] Unsupported video type:', options.video.type);
			}
		}
	}

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method removePlayer
	 */
	public removePlayer(options: IVideoPlayerOptions = this.options): void
	{
		if(this._videoPlayer)
		{
			this._videoPlayer.unload();

			if(options.video.type == VideoType.VIMEO)
			{
				let videoPlayer:Vimeo.Player = <Vimeo.Player>this._videoPlayer;

				// Remove all event listeners
				videoPlayer.off('ended');
				videoPlayer.off('timeupdate');

				// Do not remove the video player from the DOM because otherwise it has issues when creating a new instance.
				// There is no actual destroy method, see ticket https://github.com/vimeo/player.js/issues/126
				videoPlayer.element.style.display = 'none';
				videoPlayer = null;
			}
			else
			{
				let videoPlayer: VideoPlayer = <VideoPlayer>this._videoPlayer;
				videoPlayer.destruct();
				videoPlayer = null;
			}

			this._videoPlayer = null;
		}
	}

	/**
	 * @public
	 * @method hideControls
	 */
	public hideControls(): void
	{
		if(this._videoControls)
		{

		}
	}

	/**
	 * @public
	 * @method play
	 * @returns {PromiseBluebird<any>}
	 */
	public play(): Promise<any>
	{
		if(this._videoControls)
		{
			this._videoControls.isPlaying = true;
		}

		return this._videoPlayer.play();
	}

	/**
	 * @public
	 * @method pause
	 * @returns {PromiseBluebird<any>}
	 */
	public pause(): Promise<any>
	{
		return this._videoPlayer.pause();
	}

	/**
	 * @public
	 * @method setCurrentTime
	 */
	public setCurrentTime(time: number): Promise<any>
	{
		return this._videoPlayer.setCurrentTime(time);
	}

	/**
	 * @public
	 * @Method unload
	 * @returns {PromiseBluebird<any>}
	 */
	public unload(): Promise<any>
	{
		return this._videoPlayer.unload();
	}

	/**
	 * @public
	 * @method setMute
	 * @param {boolean} mute
	 */
	public setMute(mute: boolean): void
	{
		this._videoPlayer.setVolume(mute ? 0 : 1);
	}

	/**
	 * @public
	 * @method setControlVisibility
	 * @param isActive
	 */
	public setControlVisibility(isActive: boolean): void
	{
		if(this._videoControls && this._enableCustomControls)
		{
			this._videoControls.isActive = isActive;
		}
	}

	/**
	 * @private
	 * @method createInternalVideoPlayer
	 */
	private createInternalVideoPlayer(): void
	{
		this._enableCustomControls = true;

		this._videoPlayer = new VideoPlayer(
			this.element,
			{
				url: this.options.video.url,
				poster: this.options.poster,
				loop: this.options.loop,
				controls: this.options.controls
			}
		);

		(<VideoPlayer>this._videoPlayer).addEventListener(VideoElement.EVENT_ENDED, this.handleVideoEnded);
		(<VideoPlayer>this._videoPlayer).addEventListener(VideoElement.EVENT_TIMEUPDATE, this.handleTimeUpdate);

		this.handleVideoPlayerReady();
	}

	/**
	 * @private
	 * @method createVideoPlayer
	 */
	private createVimeoPlayer(): void
	{
		this._enableCustomControls = false;

		this._videoPlayer = new Vimeo.Player(
			this.element,
			{
				id: this.options.video.url,
				width: 640,
				height: 480,
				loop: this.options.loop,
				title: false,
				byline: false,
				portrait: false
			});

		const player = (<Vimeo.Player>this._videoPlayer);

		player.element.style.display = 'block';

		if(DEBUG)
		{
			// TODO: remove this, but sound is annoying in development!
			player.setVolume(0);
		}

		player.on('ended', this.handleVideoEnded);
		player.on('timeupdate', this.handleTimeUpdate);
		player.ready().then(() => this.handleVideoPlayerReady())
	}

	/**
	 * @private
	 * @method handleVideoPlayerReady
	 */
	private handleVideoPlayerReady(): void
	{
		this.handleResize();
	}

	/**
	 * @private
	 * @method handleResize
	 */
	private handleResize(): void
	{
		// Only run if the video element is created
		if(this.element.firstElementChild && (bowser.msie || bowser.msedge))
		{
			ElementResizer.resize(
				<HTMLElement>this.element.firstElementChild,
				16,
				9,
				ScaleMode.COVER
			);
		}
	}

	/**
	 * @private handleVideoEnded
	 */
	private handleVideoEnded = (): void =>
	{
		this.dispatch(VideoPlayerController.ENDED);
	};


	/**
	 * @private
	 * @method handleTimeUpdate
	 * @param event
	 */
	private handleTimeUpdate = (event): void =>
	{
		this.dispatch(VideoPlayerController.TIME_UPDATE);

		this.updateProgressBar();

	};

	/**
	 * @private
	 * @method updateProgressBar
	 */
	private updateProgressBar(): void
	{
		if(this._videoControls)
		{
			let currentTime: number;
			let duration: number;

			this._videoPlayer.getCurrentTime()
				.then((value) => currentTime = value)
				.then(() => this._videoPlayer.getDuration())
				.then((value) => duration = value)
				.then(() =>
				{
					this._videoControls.progress = currentTime / duration;
				})
		}
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.removePlayer();

		// always call this last
		super.destruct();
	}
}

export default VideoPlayerController;
