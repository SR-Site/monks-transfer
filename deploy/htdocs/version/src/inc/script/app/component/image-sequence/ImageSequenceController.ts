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

class ImageSequenceController extends AbstractComponentController<ImageSequenceViewModel, IImageSequenceOptions>
{
	public static READY: string = 'ImageSequenceController.READY';
	public static FRAME_CHANGED: string = 'ImageSequenceController.FRAME_CHANGED';

	private _dataManager: DataManager = DataManager.getInstance();
	private _debug: Log = new Log('app.component.ImageSequence');

	private _sources: {[devicestate: number]: Array<string>} = {
		[DeviceState.SMALL]: [],
		[DeviceState.MEDIUM]: []
	};

	private _images: {[devicestate: number]: Array<HTMLImageElement>} = {
		[DeviceState.SMALL]: [],
		[DeviceState.MEDIUM]: []
	};

	private _lightCinematic: {[devicestate: number]: LightCinematic} = {
		[DeviceState.SMALL]: null,
		[DeviceState.MEDIUM]: null
	};

	// shorter nested object with preloaded images element for active deviceState.
	private _lightManager: LightManager;
	private _previousDeviceState: DeviceState;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		this._debug.log('Init');

		this._lightManager = new LightManager({
			fps: 24,
			width: this.element.offsetWidth,
			height: this.element.offsetHeight,
			canvas: this.element.querySelector('canvas')
		});

		this._lightManager.start();

		// Prepare all the sources for the image sequence
		for(let i = 0; i < this.options.imageSequence.total; i++)
		{
			this._sources[DeviceState.SMALL].push(this.options.imageSequence.image.small + NumberUtils.format(i, '', '', 0, 4) + this.options.imageSequence.extension);
			this._sources[DeviceState.MEDIUM].push(this.options.imageSequence.image.normal + NumberUtils.format(i, '', '', 0, 4) + this.options.imageSequence.extension);
		}

		this._previousDeviceState = this.currentDeviceState;

		this.destructibles.add(new NativeEventListener(window, 'resize', ThrottleDebounce.debounce(this.handleResize, 200, this)));

		this.setup();
	}

	/**
	 * @public
	 * @method seek
	 */
	public seek(frame: number): void
	{
		this._lightManager.start();
		this._lightCinematic[this.currentDeviceState].goto(frame);
		this._lightManager.stop = true;
	}


	/**
	 * @private
	 * @method setup
	 */
	private setup(): void
	{
		this.loadAllCurrentDeviceStateImages()
			.then(() =>
			{
				// Enable the correct lightCinematic
				this._lightManager.appendChild(this._lightCinematic[this.currentDeviceState]);

				// Let the parent class know we are ready for interaction
				this.dispatch(ImageSequenceController.READY);

				// Add subscription for when device state changes.
				this.destructibles.addKOSubscription(this._dataManager.deviceStateTracker.currentState.subscribe(this.handleDeviceStateChange.bind(this)));
			});
	}

	/**
	 * @private
	 * @method handleResize
	 */
	private handleResize(): void
	{
		this._lightManager.setCanvasSize(this.element.offsetWidth, this.element.offsetHeight);
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
		this.loadAllCurrentDeviceStateImages()
			.then(() =>
			{
				// Enable the new cinematic
				this._lightManager.removeChild(this._lightCinematic[this._previousDeviceState]);
				this._lightManager.appendChild(this._lightCinematic[this.currentDeviceState]);

				// Save it
				this._previousDeviceState = this.currentDeviceState;
			});
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
			}).then(() => this.createLightCinematic(currentValidDeviceState));
		}
		else
		{
			return new Promise((resolve: Function) => resolve());
		}
	}

	/**
	 * @private
	 * @method createLightCinematic
	 */
	private createLightCinematic(currentValidDeviceState: DeviceState): void
	{
		this._lightCinematic[currentValidDeviceState] = new LightCinematic({
			frames: {
				count: this.options.imageSequence.total,
				width: this._images[currentValidDeviceState][0].width,
				height: this._images[currentValidDeviceState][0].height,
				src: this._images[currentValidDeviceState]
			},
			stop: true,
			loop: false,
			x: 0,
			y: 0
		})
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		if(this._lightManager)
		{
			this._lightManager.destruct();
			this._lightManager = null;
		}

		// always call this last
		super.destruct();
	}
}

export default ImageSequenceController;