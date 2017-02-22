import AbstractButtonController from "../AbstractButtonController";
import ButtonTagTransitionController from 'app/component/button/button-tag/ButtonTagTransitionController';
import IButtonTagOptions from 'app/component/button/button-tag/IButtonTagOptions';
import ButtonTagViewModel from 'app/component/button/button-tag/ButtonTagViewModel';

import Log from "lib/temple/util/Log";

class ButtonTagController extends AbstractButtonController<ButtonTagViewModel, IButtonTagOptions, ButtonTagTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonTag');

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
		this.transitionController = new ButtonTagTransitionController(this.element, this);

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

export default ButtonTagController;
