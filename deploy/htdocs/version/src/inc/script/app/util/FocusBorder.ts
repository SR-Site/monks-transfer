import Destructible from "../../lib/temple/core/Destructible";
import DestructibleHelper from "../../lib/temple/core/DestructibleHelper";

class FocusBorder extends Destructible
{
	private _element: HTMLElement;
	private _wrapper: HTMLElement;
	private _borderElement: HTMLElement;
	private _shadowElement: HTMLElement;
	private _labelElement: HTMLElement;

	private _value: KnockoutObservable<string>;

	private _destructibles: DestructibleHelper = new DestructibleHelper();

	constructor(element: HTMLElement, value: KnockoutObservable<string>)
	{
		super();

		this._element = element;
		this._value = value;
		this._wrapper = <HTMLElement>element.parentNode;
		this._labelElement = <HTMLElement>this._wrapper.querySelector('.placeholder-label');

		this.createShadowElement();
		this.createBorderElement();

		this._destructibles.addKOSubscription(this._value.subscribe(this.handleValueChange.bind(this)));
	}

	/**
	 * @private
	 * @method createShadowElement
	 */
	private createShadowElement(): void
	{
		this._shadowElement = document.createElement('span');
		this._shadowElement.classList.add('shadow-element');

		this._wrapper.appendChild(this._shadowElement);
	}

	/**
	 * @private
	 * @method createBorderElement
	 */
	private createBorderElement(): void
	{
		this._borderElement = document.createElement('span');
		this._borderElement.classList.add('focus-border');

		this._wrapper.appendChild(this._borderElement);
	}

	/**
	 * @private
	 * @method handleValueChange
	 */
	private handleValueChange(value): void
	{
		// Update the text
		this._shadowElement.innerText = value;

		// Measure the width
		const borderWidth = this._shadowElement.offsetWidth;

		// Measure the size
		TweenLite.to(this._borderElement, 0.2, {
			width: borderWidth
		});

		// Hide or show the label
		TweenLite.to(this._labelElement, 0.2, {
			opacity: borderWidth > this._wrapper.offsetWidth - this._labelElement.offsetWidth ? 0 : 1
		});
	}
}

export default FocusBorder;