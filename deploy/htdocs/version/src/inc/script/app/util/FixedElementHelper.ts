import Destructible from "../../lib/temple/core/Destructible";
import DestructibleHelper from "../../lib/temple/core/DestructibleHelper";
import NativeEventListener from "../../lib/temple/event/NativeEventListener";

class FixedElementHelper extends Destructible
{
	public static inputFocussed: KnockoutObservable<boolean> = ko.observable(false);
	public static FOCUS_CLASS:string = 'input-focussed';

	private _destructibles: DestructibleHelper = new DestructibleHelper();

	constructor(wrapper: HTMLElement)
	{
		super();

		const inputElements = Array.prototype.slice.call(wrapper.querySelectorAll('input'));

		inputElements.forEach((element) =>
		{
			this._destructibles.add(new NativeEventListener(element, 'focus', this.handleInputFocus.bind(this)));
			this._destructibles.add(new NativeEventListener(element, 'blur', this.handleInputBlur.bind(this)));
		})
	}

	/**
	 * @private
	 * @method handleInputFocus
	 */
	private handleInputFocus(): void
	{
		document.body.classList.add(FixedElementHelper.FOCUS_CLASS);

		FixedElementHelper.inputFocussed(true);
	}

	/**
	 * @private
	 * @method handleInputBlur
	 */
	private handleInputBlur(): void
	{
		document.body.classList.remove(FixedElementHelper.FOCUS_CLASS);

		FixedElementHelper.inputFocussed(false);
	}

	/**
	 * @public
	 * @method destruct
	 */
	public destruct(): void
	{
		if(this._destructibles)
		{
			this._destructibles.destruct();
			this._destructibles = null;
		}

		super.destruct();
	}
}

export default FixedElementHelper;