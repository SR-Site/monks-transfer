import ICinematic = require('./ICinematic');
import ISpritesheet = require('./ISpritesheet');
import ISpriteProperties = require('./ISpriteProperties');

/**
 * @module Temple
 * @namespace temple.utils
 * @class LightCinematic
 *
 * @author Victor Garrido <v.garrido@mediamonks.com>
 * @version 0.1
 */
class LightCinematic
{
	public static FORWARD: number = 1;
	public static REVERSE: number = -1;

	private _properties: ICinematic;
	private _currentFrame: number = 0;
	private _ctx: CanvasRenderingContext2D;

	/**
	 * Properties in update it in every tick.
	 */
	private _spriteProps: ISpriteProperties;

	public free: boolean;
	public direction: number;
	public playing: boolean;

	/**
	 * Class for managing cinematic objects.
	 *
	 * @class LightCinematic
	 * @param {ICinematic} properties.
	 * @constructor
	 */
	constructor(properties: ICinematic)
	{
		this._spriteProps = {iX: 0, iY: 0, x: 0, y: 0};
		this.setProperties(properties);
	}

	/**
	 * Method setting properties.
	 * Useful for reusing the object.
	 * @param properties
	 */
	public setProperties(properties: ICinematic): LightCinematic
	{
		this.free = false;
		this._properties = properties;
		this._spriteProps.iX = this._spriteProps.iY = this._spriteProps.x = this._spriteProps.y = 0;
		this._currentFrame = 0;
		this.direction = LightCinematic.FORWARD;

		return this;
	}

	/**
	 * Set context in which the cinematic will be drawn
	 * @param ctx
	 */
	public setContext(ctx: CanvasRenderingContext2D): void
	{
		this._ctx = ctx;
	}

	/**
	 * Draw method
	 */
	public draw(): void
	{
		if(
			!this._properties.stop &&
			(
				(this.direction === LightCinematic.FORWARD && this._currentFrame < this._properties.frames.count - 1) ||
				(this.direction === LightCinematic.REVERSE && this._currentFrame > 0))
			)
		{
			this._currentFrame += this.direction;
		}
		else if(this._properties.loop)
		{
			this._currentFrame = 0;
		}

		this.drawImage(this._currentFrame);
	}

	/**
	 * Draw specific frame;
	 * @param frame
	 */
	public goto(frame: number): void
	{
		this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
		this.drawImage(frame);
	}

	/**
	 * Draw frame passed
	 * @param frame
	 */
	private drawImage(frame: number): void
	{
		try
		{
			this._ctx.drawImage(this.getCurrentFrameImage(frame),
				this._spriteProps.x, this._spriteProps.y,
				this._properties.frames.width, this._properties.frames.height,
				this._properties.x, this._properties.y,
				this._properties.frames.width, this._properties.frames.height);
		}
		catch(e)
		{
			console.error(e);
		}
	}

	/**
	 * Get image object of frame specified
	 * @param frame
	 * @returns {any}
	 */
	private getCurrentFrameImage(frame: number): HTMLImageElement
	{
		if(this._properties.frames.src.length > 1)
		{
			return this._properties.frames.src[frame];
		}

		this.setFrameInfo(frame);

		return this._properties.frames.src[0];
	}

	/**
	 * Set spritesheet information for the current frame.
	 * @param frame
	 */
	private setFrameInfo(frame: number): void
	{
		this._spriteProps.iX = frame % this._properties.frames.cols;
		this._spriteProps.iY = Math.floor(frame / this._properties.frames.cols);
		this._spriteProps.x = this._spriteProps.iX * this._properties.frames.width;
		this._spriteProps.y = this._spriteProps.iY * this._properties.frames.height;
	}

	destruct(): void
	{

	}
}

export = LightCinematic;