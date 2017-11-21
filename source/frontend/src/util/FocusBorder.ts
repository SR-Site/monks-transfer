import { TweenLite } from 'gsap';
import sengDisposable from 'seng-disposable';

export default class FocusBorder extends sengDisposable {
	private borderElement: HTMLElement;
	private shadowElement: HTMLElement;
	private labelElement: HTMLElement;

	constructor(private wrapper: HTMLElement) {
		super();

		this.labelElement = <HTMLElement>this.wrapper.querySelector('.placeholder-label');

		this.createShadowElement();
		this.createBorderElement();
	}

	/**
	 * @public
	 * @method update
	 */
	public update(value: string): void {
		// Update the text
		this.shadowElement.innerText = value;

		// Measure the width
		const borderWidth = this.shadowElement.offsetWidth;

		if (borderWidth > 0) {
			// Measure the size
			TweenLite.to(this.borderElement, 0.2, {
				width: borderWidth,
			});

			// Hide or show the label
			TweenLite.to(this.labelElement, 0.2, {
				opacity: borderWidth > this.wrapper.offsetWidth - this.labelElement.offsetWidth ? 0 : 1,
			});
		} else {
			this.borderElement.style.width = '';
			this.labelElement.style.opacity = '';
		}
	}

	/**
	 * @private
	 * @method createShadowElement
	 */
	private createShadowElement(): void {
		this.shadowElement = document.createElement('span');
		this.shadowElement.classList.add('shadow-element');

		this.wrapper.appendChild(this.shadowElement);
	}

	/**
	 * @private
	 * @method createBorderElement
	 */
	private createBorderElement(): void {
		this.borderElement = document.createElement('span');
		this.borderElement.classList.add('focus-border');

		this.wrapper.appendChild(this.borderElement);
	}

	/**
	 * @public
	 * @method dispose
	 */
	public dispose(): void {
		this.wrapper.removeChild(this.borderElement);
		this.wrapper.removeChild(this.shadowElement);

		this.wrapper = null;
		this.labelElement = null;
		this.borderElement = null;
		this.shadowElement = null;

		super.dispose();
	}
}
