import AbstractButtonController from "../AbstractButtonController";
import ButtonCircleIconTransitionController from 'app/component/button/button-circle-icon/ButtonCircleIconTransitionController';
import IButtonCircleIconOptions from 'app/component/button/button-circle-icon/IButtonCircleIconOptions';
import ButtonCircleIconViewModel from 'app/component/button/button-circle-icon/ButtonCircleIconViewModel';

import Log from "lib/temple/util/Log";

class ButtonCircleIconController extends AbstractButtonController<ButtonCircleIconViewModel, IButtonCircleIconOptions, ButtonCircleIconTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonCircleIcon');

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
		this.transitionController = new ButtonCircleIconTransitionController(this.element, this);

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

export default ButtonCircleIconController;
