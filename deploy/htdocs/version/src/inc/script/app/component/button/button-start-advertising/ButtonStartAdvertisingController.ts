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
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonStartAdvertising');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');
	}

	/**
	 * @public
	 * @method positionElement
	 */
	public positionElement():void
	{
		const elementHeight = this.element.offsetHeight;
		const screenCenter = window.innerHeight / 2;
		const footerHeight = (<HTMLElement>document.body.querySelector('.component-footer')).offsetHeight;
		const maxScrollTop = document.body.offsetHeight - footerHeight - elementHeight;

		TweenLite.to(this.element, 0.5, {
			y: Math.min(
				maxScrollTop,
				Math.abs(ScrollUtils.scrollTop) + screenCenter - (elementHeight / 2)
			)
		});
	}

	/**
	* @protected
	* @method allComponentsLoaded
	*/
	protected allComponentsLoaded():void
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
	private handleScroll():void
	{
		this.positionElement();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default ButtonStartAdvertisingController;
