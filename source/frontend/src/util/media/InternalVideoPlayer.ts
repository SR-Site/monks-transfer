import sengEvent from 'seng-event';
import CommonEvent from 'seng-event/lib/event/CommonEvent';
import VideoElement from 'lib/media/VideoElement';
import IImage from 'data/interface/media/IImage';

interface IVideoPlayerOptions {
	url: string;
	poster?: IImage;
	loop?: boolean;
	controls?: boolean;
}

export default class InternalVideoPlayer extends sengEvent {
	private _container: HTMLElement;
	private _videoElement: VideoElement;

	constructor(container: Node | HTMLElement, options: IVideoPlayerOptions) {
		super();

		this._videoElement = new VideoElement();
		this._videoElement.src = options.url;
		this._videoElement.loop = options.loop || false;
		this._videoElement.controls = options.controls || false;

		if (options.poster) {
			this._videoElement.poster = options.poster.normal;
		}

		this._videoElement.addEventListener(VideoElement.EVENT_ENDED, this.handleVideoEnded);
		this._videoElement.addEventListener(VideoElement.EVENT_TIMEUPDATE, this.handleTimeUpdate);

		this._container = <HTMLElement>container;

		this._container.insertBefore(this._videoElement.element, this._container.childNodes[0]);
	}

	/**
	 * @public
	 * @get element
	 * @returns {HTMLVideoElement}
	 */
	public get element(): HTMLVideoElement {
		return this._videoElement.element;
	}

	/**
	 * @public
	 * @method play
	 * @returns {PromiseBluebird}
	 */
	public play(): Promise<void> {
		return new Promise<void>((resolve: () => void) => {
			this._videoElement.play();

			resolve();
		});
	}

	/**
	 * @public
	 * @method seek
	 */
	public setCurrentTime(time: number): Promise<void> {
		return new Promise<void>((resolve: () => void) => {
			this._videoElement.currentTime = time;

			resolve();
		});
	}

	/**
	 * @public
	 * @method getDuration
	 */
	public getCurrentTime(): Promise<number> {
		return new Promise((resolve: (currentTime: number) => void) => {
			resolve(this._videoElement.getCurrentTime());
		});
	}

	/**
	 * @public
	 * @method getDuration
	 */
	public getDuration(): Promise<number> {
		return new Promise((resolve: (duration: number) => void) => {
			resolve(this._videoElement.getDuration());
		});
	}

	/**
	 * @public
	 * @method pause
	 */
	public pause(): Promise<void> {
		return new Promise<void>((resolve: () => void) => {
			this._videoElement.pause();

			resolve();
		});
	}

	/**
	 * @public
	 * @method unload
	 */
	public unload(): Promise<void> {
		return new Promise<void>((resolve: () => void) => {
			this._videoElement.currentTime = 0;
			this._videoElement.pause();

			resolve();
		});
	}

	/**
	 * @pubnlic
	 * @method setVolume
	 * @param {number} volume
	 * @returns {PromiseBluebird}
	 */
	public setVolume(volume: number): Promise<void> {
		return new Promise<void>((resolve: () => void) => {
			this._videoElement.volume = volume;

			resolve();
		});
	}

	/**
	 * @private
	 * @method handleVideoEnded
	 */
	private handleVideoEnded = (): void => {
		this.dispatchEvent(new CommonEvent(VideoElement.EVENT_ENDED));
	};

	/**
	 * @private
	 * @method handleTimeUpdate
	 */
	private handleTimeUpdate = (): void => {
		this.dispatchEvent(new CommonEvent(VideoElement.EVENT_TIMEUPDATE));
	};

	/**
	 * @public
	 * @method dispose
	 */
	public dispose(): void {
		if (this._container) {
			this._container.removeChild(this._videoElement.element);
			this._container = null;
		}

		if (this._videoElement) {
			this._videoElement.removeEventListener(VideoElement.EVENT_TIMEUPDATE, this.handleTimeUpdate);
			this._videoElement.removeEventListener(VideoElement.EVENT_ENDED, this.handleVideoEnded);
			this._videoElement = null;
		}

		super.dispose();
	}
}
