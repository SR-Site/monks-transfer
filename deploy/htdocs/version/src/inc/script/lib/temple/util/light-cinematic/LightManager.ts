import IStage = require('./IStage');
import LightCinematic = require('./LightCinematic');
import ICinematic = require('./ICinematic');
import Destructible from "../../core/Destructible";

/**
 * @module Temple
 * @namespace temple.utils
 * @class LightManager
 *
 * @author Victor Garrido <v.garrido@mediamonks.com>
 * @version 0.1
 */
class LightManager extends Destructible
{
	private _properties: any;
	private _isStopped: boolean = false;
	private _ctx: CanvasRenderingContext2D;

	//Timer properties
	private _fpsInterval: number;
	private _then: number = 0;
	private _update: (timestamp: number) => void;

	private _children: Array<LightCinematic> = [];

	set fps(value: number)
	{
		this._fpsInterval = 1000 / value;
	}

	set stop(value: boolean)
	{
		this._isStopped = value;
	}

	/**
	 * Class for managing cinematic objects.
	 *
	 * @class LightManager
	 * @param {IStage} properties.
	 * @constructor
	 */
	constructor(properties: IStage)
	{
		super();

		this._update = this.update.bind(this);
		this._properties = properties;
		this._fpsInterval = 1000 / this._properties.fps;

		this._ctx = this._properties.canvas.getContext('2d');

		this.setCanvasSize();
	}

	/**
	 * @public
	 * @method setCanvasSize
	 * @param width
	 * @param height
	 */
	public setCanvasSize(width: number = this._properties.width, height: number = this._properties.height): void
	{
		this._properties.width = width;
		this._properties.height = height;

		this._properties.canvas.width = width;
		this._properties.canvas.height = height;
	}

	/**
	 * Append a cinematic
	 * @param child
	 */
	public appendChild(child: LightCinematic): void
	{
		child.setContext(this._ctx);
		this._children.push(child);
	}

	/**
	 * Remove a cinematic
	 * @param child
	 */
	public removeChild(child: LightCinematic): void
	{
		var index = this._children.indexOf(child);
		if(index !== -1)
		{
			this._children.splice(index, 0);
		}
	}

	/**
	 * Loop through children returning a free one, setting new properties.
	 * @param properties
	 * @returns {LightCinematic}
	 */
	public reuseChild(properties: ICinematic): LightCinematic
	{
		for(var i = 0; i < this._children.length; i++)
		{
			if(this._children[i].free)
			{
				return this._children[i].setProperties(properties);
			}
		}

		//If there is any free children create a new instance.
		this._children.push(new LightCinematic(properties));
		return this._children[this._children.length - 1];
	}

	/**
	 * Start manager, executes RAF
	 */
	public start(): void
	{
		this._isStopped = false;
		requestAnimationFrame(this._update);
	}

	/**
	 * Method in charge of drawing the stage
	 * @param timestamp
	 */
	private update(timestamp: number): void
	{
		if(this._isStopped)
		{
			return;
		}
		// calc elapsed time since last loop
		var elapsed = timestamp - this._then;

		// if enough time has elapsed, draw the next frame
		if(elapsed > this._fpsInterval)
		{
			this._ctx.clearRect(0, 0, this._properties.canvas.width, this._properties.canvas.height);

			var length = this._children.length;
			while(length--)
			{
				if(!this._children[length].free)
				{
					this._children[length].draw();
				}
			}

			this._then = timestamp - (elapsed % this._fpsInterval);
		}
		requestAnimationFrame(this._update);
	}

	/**
	 * @public
	 * @method destruct
	 */
	public destruct(): void
	{
		this.stop = true;

		while(this._children.length)
		{
			this._children.pop().destruct();
		}

		this._children = null;

		super.destruct();
	}
}

export = LightManager;