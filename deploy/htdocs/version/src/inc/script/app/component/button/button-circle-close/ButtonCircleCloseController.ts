import AbstractButtonController from "../AbstractButtonController";
import ButtonCircleCloseTransitionController from 'app/component/button/button-circle-close/ButtonCircleCloseTransitionController';
import IButtonCircleCloseOptions from 'app/component/button/button-circle-close/IButtonCircleCloseOptions';
import ButtonCircleCloseViewModel from 'app/component/button/button-circle-close/ButtonCircleCloseViewModel';

import Log from "lib/temple/util/Log";

class ButtonCircleCloseController extends AbstractButtonController<ButtonCircleCloseViewModel, IButtonCircleCloseOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonCircleClose');

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
		this.transitionController = new ButtonCircleCloseTransitionController(this.element, this);

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

export default ButtonCircleCloseController;
