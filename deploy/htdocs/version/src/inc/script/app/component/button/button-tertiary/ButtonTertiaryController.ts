import AbstractButtonController from "../AbstractButtonController";
import ButtonTertiaryTransitionController from 'app/component/button/button-tertiary/ButtonTertiaryTransitionController';
import IButtonTertiaryOptions from 'app/component/button/button-tertiary/IButtonTertiaryOptions';
import ButtonTertiaryViewModel from 'app/component/button/button-tertiary/ButtonTertiaryViewModel';

import Log from "lib/temple/util/Log";

class ButtonTertiaryController extends AbstractButtonController<ButtonTertiaryViewModel, IButtonTertiaryOptions, ButtonTertiaryTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonTertiary');

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
		this.transitionController = new ButtonTertiaryTransitionController(this.element, this);

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

export default ButtonTertiaryController;
