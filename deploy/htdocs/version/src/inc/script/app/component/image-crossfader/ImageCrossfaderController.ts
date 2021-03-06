import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
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
import bowser = require("bowser");

class ImageCrossfaderController extends AbstractTransitionComponentController<ImageCrossfaderViewModel, IImageCrossfaderOptions, ImageCrossfaderTransitionController>
{
	/**
	 * @description Not sure if we want to crossfade playing video's it could be a performance issue
	 * @type {boolean}
	 */
	private static PAUSE_VIDEO_ON_CROSS: boolean = true;

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

	private _activeImage: HTMLImageElement|HTMLVideoElement;
	private _activeImageOffset: IRectangle;

	private _newImage: HTMLImageElement|HTMLVideoElement;
	private _newImageOffset: IRectangle;

	private _canvas: HTMLCanvasElement;
	private _ctx: CanvasRenderingContext2D;

	private _maskCanvas: HTMLCanvasElement;
	private _maskCtx: CanvasRenderingContext2D;

	private _overlayCanvas: HTMLCanvasElement;
	private _overlayCtx: CanvasRenderingContext2D;

	private _trianglePattern: TrianglePattern;
	private _triangleProgress: number = 0;

	private _images: {[index: string]: HTMLImageElement;} = {};
	private _animation: TweenLite;

	private _videoInterval?: number;

	/**
	 * @property _oldWidth
	 * @description On android devices a resize is triggerd when the height changes. We do not want this to happen
	 */
	private _oldWidth: number = 0;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		this._debug.log('Init');

		this.transitionController = new ImageCrossfaderTransitionController(this.element, this);

		this.destructibles.add(new NativeEventListener(window, 'resize', ThrottleDebounce.debounce(this.handleResize, 200, this)));

		// Overlay canvas
		this._overlayCanvas = document.createElement('canvas');
		this._overlayCtx = this._overlayCanvas.getContext('2d');

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

		super.init();
	}

	/**
	 * @public
	 * @method setOverlay
	 * @param overlayColor
	 * @description if set a mask will be drawn on top of the image
	 */
	public setOverlay(overlayColor: string = 'rgba(0,48,87,0.5)'): void
	{
		this._overlayCanvas.width = 50;
		this._overlayCanvas.height = 50;

		// Clear the old mask
		this._overlayCtx.clearRect(0, 0, this._overlayCanvas.width, this._overlayCanvas.height);

		// Change the fill style
		this._overlayCtx.fillStyle = overlayColor;
		this._overlayCtx.rect(0, 0, this._overlayCanvas.width, this._overlayCanvas.height);
		this._overlayCtx.fill();
	}

	/**
	 * @public
	 * @method openImage
	 * @param path
	 * @param duration
	 * @param ease
	 * @returns {PromiseBluebird<U>}
	 */
	public openImage(path: string, duration: number = ImageCrossfaderController.DURATION, ease: Ease = Quad.easeInOut): Promise<any>
	{
		return this.getImage(path)
			.then((image: HTMLImageElement) => this._newImage = image)
			.then(() => this.calculateDimensions())
			.then(() => this.open(duration, ease));
	}

	/**
	 * @public
	 * @method openVideo
	 * @param video
	 * @param duration
	 * @param ease
	 * @returns {Promise<any>}
	 */
	public openVideo(video: HTMLVideoElement, duration: number = ImageCrossfaderController.DURATION, ease: Ease = Quad.easeInOut): Promise<any>
	{
		this._newImage = video;

		this.calculateDimensions();

		// Keep playing the video until we start a new animation
		return this.open(duration, ease)
			.then(() =>
			{
				if(ImageCrossfaderController.PAUSE_VIDEO_ON_CROSS)
				{
					(<HTMLVideoElement>this._activeImage).play();
				}
			})
			.then(() =>
			{
				// Start the loop of the video
				this._videoInterval = setInterval(() => this.draw(), 1000 / 60)
			})
	}

	/**
	 * @public
	 * @method open
	 * @param duration
	 * @param ease
	 */
	public open(duration: number = ImageCrossfaderController.DURATION, ease: Ease = Quad.easeInOut): Promise<any>
	{
		return new Promise((resolve: () => void) =>
		{
			this._animation = TweenLite.fromTo(this, duration,
				{
					_triangleProgress: 0
				},
				{
					_triangleProgress: 1,
					ease: ease,
					onStart: this.handleTriangleAnimationStart.bind(this),
					onUpdate: this.draw.bind(this),
					onComplete: () =>
					{
						// Update the active one
						this._activeImage = this._newImage;

						// Reset the "new image" because we made the switch
						this._newImage = null;

						// The active image has been set to re-calculate once before we start the infinite loop
						this.calculateDimensions();

						// Draw the final frame, when we make the switch
						this.draw();

						resolve();
					}
				});
		})
	}

	/**
	 * @private
	 * @method handleTriangleAnimationStart
	 */
	private handleTriangleAnimationStart(): void
	{
		// Check if there is a video playing and that we need to pause it
		if(ImageCrossfaderController.PAUSE_VIDEO_ON_CROSS && this._videoInterval !== null)
		{
			if(this._newImage && this._newImage.tagName === 'VIDEO')
			{
				(<HTMLVideoElement>this._newImage).pause();
			}

			if(this._activeImage && this._activeImage.tagName === 'VIDEO')
			{
				(<HTMLVideoElement>this._activeImage).pause();
			}
		}

		// Always clear the interval of the playing video because it will be re-triggered when openVideo is called
		clearInterval(this._videoInterval);

		// Clear the interval var
		this._videoInterval = null;
	}

	/**
	 * @private
	 * @method getImage
	 */
	private getImage(path: string): Promise<any>
	{
		return new Promise((resolve: (image: HTMLImageElement) => void) =>
		{
			if(this._images[path])
			{
				resolve(this._images[path])
			}
			else
			{
				AssetLoader.loadImage(path)
					.then((image) =>
					{
						// Store for later usage
						this._images[path] = image;

						resolve(image);
					})
					.catch((reason) => console.log('[Unable to load image', reason));
			}
		});
	}


	/**
	 * @private
	 * @method draw
	 */
	private draw(): void
	{
		if(this.isDestructed())
		{
			return;
		}

		// Check if we reached the end of the animation, if so we skipp the mask stuff because it's heavy
		if(this._triangleProgress < 1)
		{
			this.drawImageFrame(this._newImage, this._newImageOffset);

			let rightProgress = Math.min(0.5, this._triangleProgress) / 0.5;
			let leftProgress = Math.max(0, (this._triangleProgress - 0.5) / 0.5);

			this._trianglePattern.draw(rightProgress, false);

			if(rightProgress >= 1)
			{
				this._trianglePattern.draw(leftProgress, true);
			}

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
		else
		{
			this.drawImageFrame(this._activeImage, this._activeImageOffset);
		}
	}

	/**
	 * @private
	 * @method drawNewImageFrame
	 * @param source
	 * @param imageOffset
	 * @param ctx
	 * @param canvas
	 */
	private drawImageFrame(source: HTMLImageElement|HTMLVideoElement,
	                       imageOffset: IRectangle,
	                       ctx: CanvasRenderingContext2D = this._ctx,
	                       canvas: HTMLCanvasElement = this._canvas): void
	{
		if(source)
		{
			ctx.drawImage(
				source,
				imageOffset.x,
				imageOffset.y,
				imageOffset.width,
				imageOffset.height
			);

			// Draw the overlay if required
			ctx.drawImage(this._overlayCanvas, 0, 0, canvas.width, canvas.height);
		}
	}

	/**
	 * @private
	 * @method handleResize
	 */
	private handleResize(): void
	{
		if(bowser.android && this._oldWidth === document.body.offsetWidth)
		{
			return;
		}

		this.calculateDimensions();
	}

	/**
	 * @private
	 * @method calculateDimensions
	 */
	private calculateDimensions(): void
	{
		this._oldWidth = window.innerWidth;

		// Measure the REM size to calculate the triangle grid
		this._gridSize = (<HTMLElement><HTMLElement>this.element.querySelector('.grid-size')).offsetWidth;

		// Update the canvas size
		this.setCanvasSize();

		if(this._activeImage)
		{
			this._activeImageOffset = this.getOffset(this._activeImage);
		}

		if(this._newImage)
		{
			this._newImageOffset = this.getOffset(this._newImage);
		}

		// Re-draw the last frame
		if(this._activeImage)
		{
			this.draw();
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
			this.drawImageFrame(this._activeImage, this._activeImageOffset, this._maskCtx, this._maskCanvas);
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
	 * @method getOffset
	 */
	private getOffset(image: HTMLImageElement|HTMLVideoElement): IRectangle
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
		this._images = null;
		this._canvas = null;
		this._ctx = null;

		this._overlayCanvas = null;
		this._overlayCtx = null;
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
