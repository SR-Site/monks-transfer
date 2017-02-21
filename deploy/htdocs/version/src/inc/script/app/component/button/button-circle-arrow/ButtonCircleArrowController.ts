import AbstractButtonController from "../AbstractButtonController";
import ButtonCircleArrowTransitionController from 'app/component/button/button-circle-arrow/ButtonCircleArrowTransitionController';
import IButtonCircleArrowOptions from 'app/component/button/button-circle-arrow/IButtonCircleArrowOptions';
import ButtonCircleArrowViewModel from 'app/component/button/button-circle-arrow/ButtonCircleArrowViewModel';

import Log from "lib/temple/util/Log";

class ButtonCircleArrowController extends AbstractButtonController<ButtonCircleArrowViewModel, IButtonCircleArrowOptions, ButtonCircleArrowTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonCircleArrow');

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
		this.transitionController = new ButtonCircleArrowTransitionController(this.element, this);

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

export default ButtonCircleArrowController;
