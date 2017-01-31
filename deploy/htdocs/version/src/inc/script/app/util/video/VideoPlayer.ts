import VideoElement from "../../../lib/temple/util/VideoElement";
import Promise = require("bluebird");
import EventDispatcher from "../../../lib/temple/event/EventDispatcher";
import IImage from "../../data/interface/media/IImage";

/**
 * @class VideoPlayer
 * @description Simple class that handles playing of video's. It uses the VideoElement class to create a HTML5 Video player,
 * This class was required because we also have a VimeoPlayer and we wanted the interface for the player to be the same.
 */
class VideoPlayer extends EventDispatcher
{
	private _container:HTMLElement;
	private _videoElement:VideoElement;

	constructor(container:Node|HTMLElement, options:IVideoPlayerOptions)
	{
		super();

		this._videoElement = new VideoElement();
		this._videoElement.src = options.url;
		this._videoElement.loop = options.loop || false;
		this._videoElement.controls = options.controls || false;

		if(options.poster)
		{
			this._videoElement.poster = options.poster.normal;
		}

		this._videoElement.addEventListener(VideoElement.EVENT_ENDED, this.handleVideoEnded);
		this._videoElement.addEventListener(VideoElement.EVENT_TIMEUPDATE, this.handleTimeUpdate);

		this._container = <HTMLElement>container;

		this._container.insertBefore(this._videoElement.element, this._container.childNodes[0]);
	}

	/**
	 * @public
	 * @method play
	 * @returns {PromiseBluebird}
	 */
	public play():Promise<any>
	{
		return new Promise((resolve:()=>void)=>
		{
			this._videoElement.play();

			resolve();
		})
	}

	/**
	 * @public
	 * @method seek
	 */
	public setCurrentTime(time:number):Promise<any>
	{
		return new Promise((resolve:()=>void)=>
		{
			this._videoElement.currentTime = time;

			resolve();
		});
	}

	/**
	 * @public
	 * @method getDuration
	 */
	public getCurrentTime():Promise<any>
	{
		return new Promise((resolve:(currentTime:number)=>void)=>
		{
			resolve(this._videoElement.getCurrentTime());
		});
	}

	/**
	 * @public
	 * @method getDuration
	 */
	public getDuration():Promise<any>
	{
		return new Promise((resolve:(duration:number)=>void)=>
		{
			resolve(this._videoElement.getDuration());
		});
	}

	/**
	 * @public
	 * @method pause
	 */
	public pause():Promise<any>
	{
		return new Promise((resolve:()=>void)=>
		{
			this._videoElement.pause();

			resolve();
		})
	}

	/**
	 * @public
	 * @method unload
	 */
	public unload():Promise<any>
	{
		return new Promise((resolve:()=>void)=>
		{
			this._videoElement.currentTime = 0;
			this._videoElement.pause();

			resolve();
		})
	}

	/**
	 * @pubnlic
	 * @method setVolume
	 * @param {number} volume
	 * @returns {PromiseBluebird}
	 */
	public setVolume(volume:number):Promise<any>
	{
		return new Promise((resolve:()=>void)=>
		{
			this._videoElement.volume = volume;

			resolve();
		})
	}

	/**
	 * @private
	 * @method handleVideoEnded
	 */
	private handleVideoEnded = ():void =>
	{
		this.dispatch(VideoElement.EVENT_ENDED);
	};

	/**
	 * @private
	 * @method handleTimeUpdate
	 */
	private handleTimeUpdate = ():void =>
	{
		this.dispatch(VideoElement.EVENT_TIMEUPDATE)
	};

	/**
	 * @public
	 * @method destruct
	 */
	public destruct():void
	{
		if(this._container)
		{
			this._container.removeChild(this._videoElement.element);
			this._container = null;
		}

		if(this._videoElement)
		{
			this._videoElement.removeEventListener(VideoElement.EVENT_TIMEUPDATE, this.handleTimeUpdate);
			this._videoElement.removeEventListener(VideoElement.EVENT_ENDED, this.handleVideoEnded);
			this._videoElement = null;
		}

		super.destruct();
	}
}

interface IVideoPlayerOptions
{
	url:string;
	poster?:IImage;
	loop?:boolean;
	controls?:boolean;
}

export default VideoPlayer;
