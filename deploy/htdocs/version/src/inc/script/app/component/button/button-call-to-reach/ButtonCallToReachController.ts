import AbstractButtonController from "../AbstractButtonController";
import ButtonCallToReachTransitionController from 'app/component/button/button-call-to-reach/ButtonCallToReachTransitionController';
import IButtonCallToReachOptions from 'app/component/button/button-call-to-reach/IButtonCallToReachOptions';
import ButtonCallToReachViewModel from 'app/component/button/button-call-to-reach/ButtonCallToReachViewModel';

import Log from "lib/temple/util/Log";

class ButtonCallToReachController extends AbstractButtonController<ButtonCallToReachViewModel, IButtonCallToReachOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonCallToReach');

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
		this.transitionController = new ButtonCallToReachTransitionController(this.element, this);

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

export default ButtonCallToReachController;
