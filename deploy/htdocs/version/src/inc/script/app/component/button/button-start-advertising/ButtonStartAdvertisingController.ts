import DefaultButtonController from "../DefaultButtonController";
import ButtonStartAdvertisingTransitionController from 'app/component/button/button-start-advertising/ButtonStartAdvertisingTransitionController';
import IButtonStartAdvertisingOptions from 'app/component/button/button-start-advertising/IButtonStartAdvertisingOptions';
import ButtonStartAdvertisingViewModel from 'app/component/button/button-start-advertising/ButtonStartAdvertisingViewModel';

import Log from "lib/temple/util/Log";

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
	* @protected
	* @method allComponentsLoaded
	*/
	protected allComponentsLoaded():void
	{
		this.transitionController = new ButtonStartAdvertisingTransitionController(this.element, this);

		super.allComponentsLoaded();
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
