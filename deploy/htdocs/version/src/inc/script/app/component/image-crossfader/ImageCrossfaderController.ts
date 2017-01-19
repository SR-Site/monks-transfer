import DefaultComponentTransitionController from "app/util/component-transition/default-component-transition/DefaultComponentTransitionController";
import ImageCrossfaderTransitionController from 'app/component/image-crossfader/ImageCrossfaderTransitionController';
import IImageCrossfaderOptions from 'app/component/image-crossfader/IImageCrossfaderOptions';
import ImageCrossfaderViewModel from 'app/component/image-crossfader/ImageCrossfaderViewModel';

import Log from "lib/temple/util/Log";
import AssetLoader from "../../util/AssetLoader";
import ElementResizer from "../../../lib/temple/util/ui/ElementResizer";
import {ScaleMode} from "../../../lib/temple/util/ui/ElementResizer";
import NativeEventListener from "../../../lib/temple/event/NativeEventListener";
import ThrottleDebounce from "../../../lib/temple/util/ThrottleDebounce";
import IRectangle from "../../../lib/temple/geom/IRectangle";
import Alignment from "../../data/enum/layout/Alignment";
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
	private static BACKGROUND_COLOR:string = '#fff';

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

	private _triangleLeft: {canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D};
	private _triangleRight: {canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D};

	private _triangleCanvas: HTMLCanvasElement;
	private _triangleCtx: CanvasRenderingContext2D;
	private _triangleProgress: number = 0;

	private _maskCanvas: HTMLCanvasElement;
	private _maskCtx: CanvasRenderingContext2D;

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

		// Canvas containing the triangle animation
		this._triangleCanvas = document.createElement('canvas');
		this._triangleCtx = this._triangleCanvas.getContext('2d');

		// Canvas containing the clipped old image with the triangle animation
		this._maskCanvas = document.createElement('canvas');
		this._maskCtx = this._maskCanvas.getContext('2d');

		this.handleResize();

		// Canvas containing the left triangle
		this._triangleLeft = this.getTriangle(Alignment.LEFT, '#f00');
		this._triangleRight = this.getTriangle(Alignment.RIGHT, '#0f0');

	}

	/**
	 * @public
	 * @method play
	 */
	public open(path: string = 'data/image/hero-main/slide-1.jpg'): Promise<any>
	{
		return new Promise((resolve: () => void) =>
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

								resolve();
							}
						});
				});
		});
	}

	/**
	 * @private
	 * @method getTriangle
	 * @description returns a canvas element containing a triangle
	 */
	private getTriangle(alignment: Alignment = Alignment.LEFT, color: string = '#000000'): {canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D}
	{
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		// Calculate the triangle size
		let size = this._gridSize * ImageCrossfaderController.TRIANGLE_SIZE;

		// Set the dimensions
		canvas.width = size;
		canvas.height = size;

		ctx.moveTo(0, 0);
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;

		if(alignment === Alignment.LEFT)
		{
			ctx.lineTo(0, size);
			ctx.lineTo(size, size);
		}
		else if(alignment === Alignment.RIGHT)
		{
			ctx.lineTo(size, size);
			ctx.lineTo(size, 0);
		}

		ctx.lineTo(0, 0);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		return {
			canvas: canvas,
			ctx: ctx
		};
	}

	/**
	 * @private
	 * @method drawTriangle
	 */
	private drawTriangle(): void
	{
		this._triangleCtx.rect(0, 0, this._triangleCanvas.width, this._triangleCanvas.height);
		this._triangleCtx.fill();

		let rightProgress = Math.min(0.5, this._triangleProgress) / 0.5;
		let leftProgress = Math.max(0, (this._triangleProgress - 0.5) / 0.5);

		// Change the position of the right triangle
		let rightPos = this._triangleCanvas.width - (this._triangleCanvas.width * rightProgress);
		let leftPos = -this._triangleCanvas.width + (this._triangleCanvas.width * leftProgress);

		this._triangleCtx.save();
		this._triangleCtx.globalCompositeOperation = 'destination-in';

		// Draw the mask triangle
		this._triangleCtx.drawImage(this._triangleLeft.canvas, leftPos, leftPos);
		this._triangleCtx.restore();

		this._triangleCtx.save();
		this._triangleCtx.drawImage(this._triangleRight.canvas, rightPos, rightPos);
		this._triangleCtx.restore();
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method drawMaskCanvas
	 */
	private drawMaskCanvas(): void
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
		this._maskCtx.fillStyle = this._ctx.createPattern(this._triangleCanvas, 'repeat');
		this._maskCtx.fill();

		this._maskCtx.restore();
	}

	/**
	 * @private
	 * @method draw
	 */
	private draw(): void
	{
		// Update the triangle pattern
		this.drawTriangle();

		// Clear the stage
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

		// Draw the new image behind the active image
		this._ctx.drawImage(
			this._newImage,
			this._newImageOffset.x,
			this._newImageOffset.y,
			this._newImageOffset.width,
			this._newImageOffset.height
		);

		// Draw the mask on top of the new image
		this.drawMaskCanvas();

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

		this._maskCanvas.width = this.element.offsetWidth;
		this._maskCanvas.height = this.element.offsetHeight;

		const triangleSize = this._gridSize * ImageCrossfaderController.TRIANGLE_SIZE;

		this._triangleCanvas.width = triangleSize;
		this._triangleCanvas.height = triangleSize;
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

export default ImageCrossfaderController;
