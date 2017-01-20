import Destructible from "../../../../lib/temple/core/Destructible";

class TrianglePattern extends Destructible
{
	private _canvas: HTMLCanvasElement;
	private _ctx: CanvasRenderingContext2D;

	private _centerX: number;
	private _centerY: number;

	private _triangleSize: number;

	constructor()
	{
		super();

		this._canvas = document.createElement('canvas');
		this._ctx = this._canvas.getContext('2d');
	}

	/**
	 * @public
	 * @method get canvas
	 * @returns {HTMLCanvasElement}
	 */
	public get canvas(): HTMLCanvasElement
	{
		return this._canvas;
	}

	/**
	 * @public
	 * @method handleResize
	 * @param triangleSize
	 */
	public handleResize(triangleSize: number): void
	{
		this._triangleSize = triangleSize;

		this._canvas.width = triangleSize * 2;
		this._canvas.height = triangleSize * 2;

		this._centerX = this._canvas.width / 2;
		this._centerY = this._canvas.height / 2;
	}

	private yPos(y: number, inverted: boolean = false): number
	{
		return inverted ? this._centerY + (this._centerY - y) : y;
	}

	private xPos(x: number, inverted: boolean = false): number
	{
		return inverted ? this._centerX + (this._centerX - x) : x;
	}

	/**
	 * @public
	 * @param progress
	 * @param inverted
	 * @method draw
	 */
	public draw(progress: number = 1, inverted: boolean): void
	{
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

		this.drawPattern(progress, inverted);

		if(inverted)
		{
			this._ctx.save();
			this.drawPattern(1, false);
			this._ctx.restore();
		}
	}

	/**
	 * @private
	 * @method drawPattern
	 */
	private drawPattern(progress: number = 1, inverted: boolean): void
	{
		// Main triangle
		this._ctx.fillStyle = '#f00';
		this._ctx.strokeStyle = '#f00';
		this._ctx.beginPath();
		this._ctx.moveTo(this.xPos(0, inverted), this.yPos(0, inverted));
		this._ctx.lineTo(this.xPos(this._triangleSize, inverted), this.yPos(this._triangleSize, inverted));
		this._ctx.lineTo(this.xPos(0, inverted), this.yPos(this._triangleSize * 2, inverted));
		this._ctx.lineTo(this.xPos(0, inverted), this.yPos(0, inverted));
		this._ctx.closePath();

		// Fill the triangle
		this._ctx.fill();
		this._ctx.stroke();

		// Save the state
		this._ctx.save();

		// Change the operation
		this._ctx.globalCompositeOperation = 'destination-out';

		// Draw the mask
		this._ctx.beginPath();

		// animate the offset for the mask
		let yTranslate = progress * (this._triangleSize * 2);

		this._ctx.moveTo(this.xPos(0, inverted), this.yPos(0 - yTranslate, inverted));
		this._ctx.lineTo(this.xPos(0, inverted), this.yPos((this._triangleSize * 2) - yTranslate, inverted));
		this._ctx.lineTo(this.xPos(this._triangleSize, inverted), this.yPos(this._triangleSize - yTranslate, inverted));
		this._ctx.lineTo(this.xPos(this._triangleSize, inverted), this.yPos(0 - yTranslate, inverted));
		this._ctx.lineTo(this.xPos(0, inverted), this.yPos(0 - yTranslate, inverted));

		this._ctx.fillStyle = '#0f0';

		// Fill the mask
		this._ctx.fill();
		this._ctx.stroke();

		// Restore the operations
		this._ctx.restore();

		// Copy the correct parts
		let top = this._ctx.getImageData(
			inverted ? this._triangleSize : 0,
			inverted ? this._triangleSize : 0,
			this._triangleSize,
			this._triangleSize
		);

		let bottom = this._ctx.getImageData(
			inverted ? this._triangleSize : 0,
			inverted ? 0 : this._triangleSize,
			this._triangleSize,
			this._triangleSize
		);

		this._ctx.putImageData(top, inverted ? 0 : this._triangleSize, inverted ? 0 : this._triangleSize);
		this._ctx.putImageData(bottom, inverted ? 0 : this._triangleSize, inverted ? this._triangleSize : 0);
	}
}

export default TrianglePattern;