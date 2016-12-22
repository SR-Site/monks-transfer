import DefaultButtonController from "../DefaultButtonController";
import ButtonMenuTransitionController from 'app/component/button/button-menu/ButtonMenuTransitionController';
import IButtonMenuOptions from 'app/component/button/button-menu/IButtonMenuOptions';
import ButtonMenuViewModel from 'app/component/button/button-menu/ButtonMenuViewModel';

import Log from "lib/temple/util/Log";

class ButtonMenuController extends DefaultButtonController<ButtonMenuViewModel, IButtonMenuOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonMenu');

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
		this.transitionController = new ButtonMenuTransitionController(this.element, this);

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

export default ButtonMenuController;
