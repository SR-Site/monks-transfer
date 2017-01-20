import DefaultComponentTransitionController from "app/util/component-transition/default-component-transition/DefaultComponentTransitionController";
import ImageCrossfaderTransitionController from "app/component/image-crossfader/ImageCrossfaderTransitionController";
import IImageCrossfaderOptions from "app/component/image-crossfader/IImageCrossfaderOptions";
import ImageCrossfaderViewModel from "app/component/image-crossfader/ImageCrossfaderViewModel";
import Log from "lib/temple/util/Log";
import AssetLoader from "../../util/AssetLoader";
import ElementResizer, {ScaleMode} from "../../../lib/temple/util/ui/ElementResizer";
import NativeEventListener from "../../../lib/temple/event/NativeEventListener";
import ThrottleDebounce from "../../../lib/temple/util/ThrottleDebounce";
import IRectangle from "../../../lib/temple/geom/IRectangle";
import TrianglePattern from "./util/TrianglePattern";
import Promise = require("bluebird");

class ImageCrossfaderController extends DefaultComponentTransitionController<ImageCrossfaderViewModel, IImageCrossfaderOptions>
{
	/**
	 * The amount of grid sizes each triangle contains
	 * @type {number}
	 * @private
	 */
	private static TRIANGLE_SIZE: number = 2;

	/**
	 * The duration of the entire cross animation in seconds
	 * @type {number}
	 */
	private static DURATION: number = 2;

	/**
	 * The background color for when there is no previous image available
	 * @type {string}
	 */
	private static BACKGROUND_COLOR: string = '#fff';

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.ImageCrossfader');

	/**
	 * The size of 1 DOM $gridSize
	 */
	private _gridSize: number;

	private _activeImage: HTMLImageElement;
	private _activeImageOffset: IRectangle;

	private _newImage: HTMLImageElement;
	private _newImageOffset: IRectangle;

	private _canvas: HTMLCanvasElement;
	private _ctx: CanvasRenderingContext2D;

	private _maskCanvas: HTMLCanvasElement;
	private _maskCtx: CanvasRenderingContext2D;

	private _trianglePattern: TrianglePattern;
	private _triangleProgress: number = 0;

	private _promise: Promise<any>;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new ImageCrossfaderTransitionController(this.element, this);

		this.destructibles.add(new NativeEventListener(window, 'resize', ThrottleDebounce.debounce(this.handleResize, 200, this)));

		// Main display canvas
		this._canvas = this.element.querySelector('canvas');
		this._ctx = this._canvas.getContext('2d');

		// Mask canvas
		this._maskCanvas = document.createElement('canvas');
		this._maskCtx = this._maskCanvas.getContext('2d');

		// Create the triangle pattern
		this._trianglePattern = new TrianglePattern();

		// Trigger resize manually
		this.handleResize();
	}

	/**
	 * @public
	 * @method play
	 */
	public open(path: string): Promise<any>
	{
		if(!this._promise)
		{
			this._promise = new Promise((resolve: () => void) =>
			{
				AssetLoader.loadImage(path)
					.then((image: HTMLImageElement) =>
					{
						this._newImage = image;
					})
					.then(() => this.handleResize())
					.then(() =>
					{
						TweenLite.fromTo(this, ImageCrossfaderController.DURATION,
							{
								_triangleProgress: 0
							},
							{
								_triangleProgress: 1,
								ease: Power3.easeInOut,
								onUpdate: () =>
								{
									this.draw();
								},
								onComplete: () =>
								{
									this._activeImage = this._newImage;
									this._promise = null;

									resolve();
								}
							});
					});
			});
		}

		return this._promise;
	}


	/**
	 * @private
	 * @method draw
	 */
	private draw(): void
	{
		this._ctx.drawImage(
			this._newImage,
			this._newImageOffset.x,
			this._newImageOffset.y,
			this._newImageOffset.width,
			this._newImageOffset.height
		);

		let rightProgress = Math.min(0.5, this._triangleProgress) / 0.5;
		let leftProgress = Math.max(0, (this._triangleProgress - 0.5) / 0.5);

		this._trianglePattern.draw(rightProgress, false);

		if(rightProgress >= 1)
		{
			this._trianglePattern.draw(leftProgress, true);
		}

		// Draw the mask on top of the new image
		this.updateMaskCanvas();

		// Draw the new image behind the active image
		this._ctx.drawImage(
			this._maskCanvas,
			0,
			0,
			this._canvas.width,
			this._canvas.height
		);

	}

	/**
	 * @private
	 * @method handleResize
	 */
	private handleResize(): void
	{
		// Measure the REM size to calculate the triangle grid
		this._gridSize = (<HTMLElement><HTMLElement>this.element.querySelector('.grid-size')).offsetWidth;

		this.setCanvasSize();

		if(this._activeImage)
		{
			this._activeImageOffset = this.getImageOffset(this._activeImage);
		}

		if(this._newImage)
		{
			this._newImageOffset = this.getImageOffset(this._newImage);
		}
	}

	/**
	 * @private
	 * @method updateMaskCanvas
	 */
	private updateMaskCanvas(): void
	{
		this._maskCtx.clearRect(0, 0, this._maskCanvas.width, this._maskCanvas.height);

		if(this._activeImage)
		{
			this._maskCtx.drawImage(
				this._activeImage,
				this._activeImageOffset.x,
				this._activeImageOffset.y,
				this._activeImageOffset.width,
				this._activeImageOffset.height
			);
		}
		else
		{
			this._maskCtx.rect(0, 0, this._maskCanvas.width, this._maskCanvas.height);
			this._maskCtx.fillStyle = ImageCrossfaderController.BACKGROUND_COLOR;
			this._maskCtx.fill();

		}

		this._maskCtx.save();
		this._maskCtx.globalCompositeOperation = 'destination-out';

		// Draw the triangle pattern
		this._maskCtx.rect(0, 0, this._canvas.width, this._canvas.height);
		this._maskCtx.fillStyle = this._ctx.createPattern(this._trianglePattern.canvas, 'repeat');
		this._maskCtx.fill();

		this._maskCtx.restore();
	}


	/**
	 * @private
	 * @method getImageOffset
	 */
	private getImageOffset(image: HTMLImageElement): IRectangle
	{
		return ElementResizer.getRect(
			image.width,
			image.height,
			ScaleMode.COVER,
			{
				x: 0,
				y: 0,
				width: this._canvas.width,
				height: this._canvas.height
			}
		)
	}

	/**
	 * @private
	 * @method setCanvasSize
	 */
	private setCanvasSize(): void
	{
		this._canvas.width = this.element.offsetWidth;
		this._canvas.height = this.element.offsetHeight;

		this._trianglePattern.handleResize(this._gridSize * ImageCrossfaderController.TRIANGLE_SIZE);

		this._maskCanvas.width = this.element.offsetWidth;
		this._maskCanvas.height = this.element.offsetHeight;
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this._canvas = null;
		this._ctx = null;

		this._maskCanvas = null;
		this._maskCtx = null;
		this._activeImage = null;
		this._newImage = null;
		this._activeImageOffset = null;
		this._newImageOffset = null;
		this._triangleProgress = null;

		if(this._trianglePattern)
		{
			this._trianglePattern.destruct();
			this._trianglePattern = null;
		}


		// always call this last
		super.destruct();
	}
}

export default ImageCrossfaderController;
