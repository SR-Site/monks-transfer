import AbstractButtonController from "../AbstractButtonController";
import ButtonSecondaryTransitionController from 'app/component/button/button-secondary/ButtonSecondaryTransitionController';
import IButtonSecondaryOptions from 'app/component/button/button-secondary/IButtonSecondaryOptions';
import ButtonSecondaryViewModel from 'app/component/button/button-secondary/ButtonSecondaryViewModel';

import Log from "lib/temple/util/Log";

class ButtonSecondaryController extends AbstractButtonController<ButtonSecondaryViewModel, IButtonSecondaryOptions, ButtonSecondaryTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonSecondary');

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
		this.transitionController = new ButtonSecondaryTransitionController(this.element, this);

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

export default ButtonSecondaryController;
