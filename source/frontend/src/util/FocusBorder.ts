import sengDisposable from 'seng-disposable';
import { TweenLite } from 'gsap';

export default class FocusBorder extends sengDisposable {
	private _borderElement: HTMLElement;
	private _shadowElement: HTMLElement;
	private _labelElement: HTMLElement;

	constructor(private _wrapper: HTMLElement) {
		super();

		this._labelElement = <HTMLElement>this._wrapper.querySelector('.placeholder-label');

		this.createShadowElement();
		this.createBorderElement();
	}

	/**
	 * @public
	 * @method update
	 */
	public update(value: string): void {
		// Update the text
		this._shadowElement.innerText = value;

		// Measure the width
		const borderWidth = this._shadowElement.offsetWidth;

		if (borderWidth > 0) {
			// Measure the size
			TweenLite.to(this._borderElement, 0.2, {
				width: borderWidth,
			});

			// Hide or show the label
			TweenLite.to(this._labelElement, 0.2, {
				opacity: borderWidth > this._wrapper.offsetWidth - this._labelElement.offsetWidth ? 0 : 1,
			});
		}
		else {
			this._borderElement.style.width = '';
			this._labelElement.style.opacity = '';
		}
	}

	/**
	 * @private
	 * @method createShadowElement
	 */
	private createShadowElement(): void {
		this._shadowElement = document.createElement('span');
		this._shadowElement.classList.add('shadow-element');

		this._wrapper.appendChild(this._shadowElement);
	}

	/**
	 * @private
	 * @method createBorderElement
	 */
	private createBorderElement(): void {
		this._borderElement = document.createElement('span');
		this._borderElement.classList.add('focus-border');

		this._wrapper.appendChild(this._borderElement);
	}

	/**
	 * @public
	 * @method dispose
	 */
	public dispose(): void {
		this._wrapper.removeChild(this._borderElement);
		this._wrapper.removeChild(this._shadowElement);

		this._wrapper = null;
		this._labelElement = null;
		this._borderElement = null;
		this._shadowElement = null;

		super.dispose();
	}
}
