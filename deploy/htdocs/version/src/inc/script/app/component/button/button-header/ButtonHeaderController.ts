import AbstractButtonController from "../AbstractButtonController";
import ButtonHeaderTransitionController from 'app/component/button/button-header/ButtonHeaderTransitionController';
import IButtonHeaderOptions from 'app/component/button/button-header/IButtonHeaderOptions';
import ButtonHeaderViewModel from 'app/component/button/button-header/ButtonHeaderViewModel';

import Log from "lib/temple/util/Log";

class ButtonHeaderController extends AbstractButtonController<ButtonHeaderViewModel, IButtonHeaderOptions, ButtonHeaderTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonHeader');

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
		this.transitionController = new ButtonHeaderTransitionController(this.element, this);

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

export default ButtonHeaderController;
