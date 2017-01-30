import DefaultButtonController from "../DefaultButtonController";
import ButtonStartAdvertisingTransitionController from 'app/component/button/button-start-advertising/ButtonStartAdvertisingTransitionController';
import IButtonStartAdvertisingOptions from 'app/component/button/button-start-advertising/IButtonStartAdvertisingOptions';
import ButtonStartAdvertisingViewModel from 'app/component/button/button-start-advertising/ButtonStartAdvertisingViewModel';

import Log from "lib/temple/util/Log";
import NativeEventListener from "../../../../lib/temple/event/NativeEventListener";
import ThrottleDebounce from "../../../../lib/temple/util/ThrottleDebounce";
import ScrollUtils from "../../../util/ScrollUtils";

class ButtonStartAdvertisingController extends DefaultButtonController<ButtonStartAdvertisingViewModel, IButtonStartAdvertisingOptions>
{
	private static CENTER_PERCENTAGE:number = 0.6;

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.ButtonStartAdvertising');

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new ButtonStartAdvertisingTransitionController(this.element, this);

		this.destructibles.add(new NativeEventListener(document, 'scroll', ThrottleDebounce.debounce(this.handleScroll, 100, this)));

		this.positionElement();

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method handleScroll
	 */
	private handleScroll(): void
	{
		this.positionElement();
	}

	/**
	 * @private
	 * @method positionElement
	 */
	private positionElement(): void
	{
		const elementHeight = this.element.offsetHeight;
		const screenCenter = window.innerHeight * ButtonStartAdvertisingController.CENTER_PERCENTAGE;
		const footerHeight = (<HTMLElement>document.body.querySelector('.component-footer')).offsetHeight;
		const maxScrollTop = document.body.offsetHeight - footerHeight - elementHeight;

		// Calculate the center position based on the scroll position and the page height
		let yPos = Math.min(maxScrollTop, Math.abs(ScrollUtils.scrollTop) + screenCenter - (elementHeight / 2));

		// If we are not able to scroll, this is going to happen when the sub-components are not yet loaded we want to center it in the screen
		if(maxScrollTop <= 0)
		{
			yPos = screenCenter - (elementHeight / 2);
		}

		// Animate to the position
		TweenLite.to(this.element, 1, { y: yPos, ease: Expo.easeOut });
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

export default ButtonStartAdvertisingController;
