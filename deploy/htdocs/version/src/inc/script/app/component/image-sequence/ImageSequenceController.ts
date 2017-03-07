import AbstractComponentController from "lib/temple/component/AbstractComponentController";
import IImageSequenceOptions from "app/component/image-sequence/IImageSequenceOptions";
import ImageSequenceViewModel from "app/component/image-sequence/ImageSequenceViewModel";
import Log from "lib/temple/util/Log";
import {DeviceState} from "../../data/scss-shared/MediaQueries";
import NumberUtils from "../../../lib/temple/util/type/NumberUtils";
import Promise = require("bluebird");
import AssetLoader from "../../util/AssetLoader";
import DataManager from "../../data/DataManager";
import LightManager = require("../../../lib/temple/util/light-cinematic/LightManager");
import LightCinematic = require("../../../lib/temple/util/light-cinematic/LightCinematic");
import NativeEventListener from "../../../lib/temple/event/NativeEventListener";
import ThrottleDebounce from "../../../lib/temple/util/ThrottleDebounce";
import CommonEvent from "../../../lib/temple/event/CommonEvent";

class ImageSequenceController extends AbstractComponentController<ImageSequenceViewModel, IImageSequenceOptions>
{
	public static FPS: number = 24;

	private _dataManager: DataManager = DataManager.getInstance();
	private _debug: Log = new Log('app.component.ImageSequence');

	/**
	 * The original sources
	 * @type {{}}
	 * @private
	 */
	private _sources: {[devicestate: number]: Array<string>} = {
		[DeviceState.SMALL]: [],
		[DeviceState.MEDIUM]: []
	};

	/**
	 * The loaded images
	 * @type {{}}
	 * @private
	 */
	private _images: {[devicestate: number]: Array<HTMLImageElement>} = {
		[DeviceState.SMALL]: [],
		[DeviceState.MEDIUM]: []
	};

	private _currentFrame: number = 0;
	private _canvas: HTMLCanvasElement;
	private _ctx: CanvasRenderingContext2D;
	private _playAnimation: TweenLite;

	private _loopTimeout: number;
	private _stopped: boolean = false;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		this._debug.log('Init');

		this._canvas = this.element.querySelector('canvas');
		this._ctx = this._canvas.getContext('2d');

		// Prepare all the sources for the image sequence
		for(let i = 0; i < this.options.imageSequence.total; i++)
		{
			this._sources[DeviceState.SMALL].push(this.options.imageSequence.image.small + NumberUtils.format(i, '', '', 0, 3) + this.options.imageSequence.extension);
			this._sources[DeviceState.MEDIUM].push(this.options.imageSequence.image.normal + NumberUtils.format(i, '', '', 0, 3) + this.options.imageSequence.extension);
		}

		this.destructibles.add(new NativeEventListener(window, 'resize', ThrottleDebounce.debounce(this.handleResize, 200, this)));

		this.setup();
	}

	/**
	 * @public
	 * @method playFromTo
	 * @param from
	 * @param to
	 */
	public playFromTo(from: number, to: number): Promise<any>
	{
		return this.play(false, 0, from, to);
	}

	/**
	 * @public
	 * @method play
	 * @param loop
	 * @param loopDelay
	 * @param startFrame
	 * @param endFrame
	 */
	public play(loop: boolean = false, loopDelay: number = 0, startFrame: number = 0, endFrame: number = this.options.imageSequence.total): Promise<any>
	{
		return new Promise((resolve: () => void, reject: () => void) =>
		{
			if(this.isDestructed())
			{
				return;
			}

			this._stopped = false;

			// Animate the frame count
			let frameCounter = {frame: startFrame};
			let totalDuration = Math.abs(endFrame - startFrame) / ImageSequenceController.FPS;

			this._playAnimation = TweenLite.to(frameCounter, totalDuration, {
				ease: Linear.easeNone,
				frame: endFrame - 1,
				onUpdate: () =>
				{
					this.seek(Math.round(frameCounter.frame));
				},
				onComplete: () =>
				{
					resolve();

					if(loop && !this._stopped)
					{
						clearTimeout(this._loopTimeout);

						this._loopTimeout = setTimeout(() =>
						{
							this.play(loop, loopDelay);
						}, loopDelay);

					}
				}
			})
		})
	}

	/**
	 * @public
	 * @method stop
	 */
	public stop(): void
	{
		this._stopped = true;

		clearTimeout(this._loopTimeout);

		if(this._playAnimation)
		{
			this._playAnimation.kill();
			this._playAnimation = null;
		}
	}

	/**
	 * @public
	 * @method seek
	 */
	public seek(frame: number): void
	{
		this.drawFrame(frame);
	}

	/**
	 * @private
	 * @method drawFrame
	 */
	private drawFrame(frame: number = this._currentFrame): void
	{
		let image = this._images[this.currentDeviceState][frame];

		if(image)
		{
			this._ctx.clearRect(0, 0, this.element.offsetWidth, this.element.offsetHeight);
			this._ctx.drawImage(image, 0, 0, this.element.offsetWidth, this.element.offsetHeight);

			this._currentFrame = frame;

			this.dispatch(CommonEvent.UPDATE, {
				progress: frame / (this.options.imageSequence.total - 1)
			})
		}
	}

	/**
	 * @private
	 * @method setup
	 */
	private setup(): void
	{
		// Trigger one manually
		this.handleResize();

		// Load the default images
		this.loadAllCurrentDeviceStateImages()
			.then(() =>
			{
				// Let the parent class know we are ready for interaction
				this.dispatch(CommonEvent.LOADED);

				// Add subscription for when device state changes.
				this.destructibles.addKOSubscription(this._dataManager.deviceStateTracker.currentState.subscribe(this.handleDeviceStateChange.bind(this)));

				// Draw the first frame
				this.drawFrame()
			});
	}

	/**
	 * @private
	 * @method handleResize
	 */
	private handleResize(): void
	{
		this._canvas.width = this.element.offsetWidth;
		this._canvas.height = this.element.offsetHeight;
	}

	/**
	 * @private
	 * @method checkCurrentValidDeviceState
	 */
	private get currentDeviceState(): DeviceState
	{
		const currentState = this._dataManager.deviceStateTracker.currentState();

		return currentState <= DeviceState.MEDIUM ? DeviceState.SMALL : DeviceState.MEDIUM
	}

	/**
	 * @private
	 * @method handleDeviceStateChange
	 */
	private handleDeviceStateChange(currentState: number): void
	{
		this.stop();
		this.loadAllCurrentDeviceStateImages()
			.then(() => this.drawFrame());
	}

	/**
	 * @private
	 * @method loadAllImages
	 */
	private loadAllCurrentDeviceStateImages(): Promise<any>
	{
		// Save currentValidDeviceState and load all images for currentValidDeviceState
		const currentValidDeviceState = this.currentDeviceState;

		// Do not load images again if we already have the images for this valid device state
		if(!this._images[currentValidDeviceState][0])
		{
			return AssetLoader.loadImages(this._sources[currentValidDeviceState]).then((assets) =>
			{
				assets.forEach((asset, index: number) =>
				{
					this._images[currentValidDeviceState][index] = asset.image;
				});
			})
		}
		else
		{
			return new Promise((resolve: () => void) => resolve());
		}
	}


	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this._dataManager = null;
		this._canvas = null;
		this._currentFrame = null;
		this._images = null;
		this._ctx = null;

		if(this._playAnimation)
		{
			this._playAnimation.kill();
			this._playAnimation = null;
		}


		// always call this last
		super.destruct();
	}
}

export default ImageSequenceController;