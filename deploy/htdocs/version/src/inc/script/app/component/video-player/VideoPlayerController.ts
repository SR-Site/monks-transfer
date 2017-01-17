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

class VideoPlayerController extends AbstractComponentController<VideoPlayerViewModel, IVideoPlayerOptions>
{
	public static ENDED:string = 'VideoPlayerController.ENDED';
	public static TIME_UPDATE:string = 'VideoPlayerController.TIME_UPDATE';

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug:Log = new Log('app.component.VideoPlayer');

	/**
	 * The video player object
	 */
	private _videoPlayer:Vimeo.Player|VideoPlayer;


	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init():void
	{
		this._debug.log('Init');

		this.destructibles.add(new NativeEventListener(window, 'resize', ThrottleDebounce.debounce(this.handleResize, 250, this)));

		if(this.options.video) {
			this.initPlayer();
		}
	}

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method initPlayer
	 */
	public initPlayer(options:IVideoPlayerOptions = this.options):void
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
	public removePlayer(options:IVideoPlayerOptions = this.options):void
	{
		if(this._videoPlayer)
		{
			this._videoPlayer.unload();

			if(options.video.type == VideoType.VIMEO)
			{
				(<Vimeo.Player>this._videoPlayer).off('ended');
				(<Vimeo.Player>this._videoPlayer).off('timeupdate')
			}
			else {
				let videoPlayer:VideoPlayer = <VideoPlayer>this._videoPlayer;
				videoPlayer.destruct();
				videoPlayer = null;
			}

			this._videoPlayer = null;
		}
	}

	/**
	 * @public
	 * @method play
	 * @returns {PromiseBluebird<any>}
	 */
	public play():Promise<any>
	{
		return this._videoPlayer.play();
	}

	/**
	 * @public
	 * @method pause
	 * @returns {PromiseBluebird<any>}
	 */
	public pause():Promise<any>
	{
		return this._videoPlayer.pause();
	}

	/**
	 * @public
	 * @method setCurrentTime
	 */
	public setCurrentTime(time:number):Promise<any>
	{
		return this._videoPlayer.setCurrentTime(time);
	}

	/**
	 * @public
	 * @Method unload
	 * @returns {PromiseBluebird<any>}
	 */
	public unload():Promise<any>
	{
		return this._videoPlayer.unload();
	}

	/**
	 * @public
	 * @method setMute
	 * @param {boolean} mute
	 */
	public setMute(mute:boolean):void
	{
		this._videoPlayer.setVolume(mute ? 0 : 1);
	}

	/**
	 * @private
	 * @method createInternalVideoPlayer
	 */
	private createInternalVideoPlayer():void
	{
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
	private createVimeoPlayer():void
	{
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

		if(DEBUG)
		{
			// TODO: remove this, but sound is annoying in development!
			player.setVolume(0);
		}

		player.on('ended', this.handleVideoEnded);
		player.on('timeupdate', this.handleTimeUpdate);
		player.ready().then(()=> this.handleVideoPlayerReady())
	}

	/**
	 * @private
	 * @method handleVideoPlayerReady
	 */
	private handleVideoPlayerReady():void
	{
		this.handleResize();
	}

	/**
	 * @private
	 * @method handleResize
	 */
	private handleResize():void
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
	private handleVideoEnded = ():void =>
	{
		this.dispatch(VideoPlayerController.ENDED);
	};


	/**
	 * @private
	 * @method handleTimeUpdate
	 * @param event
	 */
	private handleTimeUpdate = (event):void =>
	{
		this.dispatch(VideoPlayerController.TIME_UPDATE);

		this.updateProgressBar();

	};

	/**
	 * @private
	 * @method updateProgressBar
	 */
	private updateProgressBar():void
	{

	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.removePlayer();

		// always call this last
		super.destruct();
	}
}

export default VideoPlayerController;
