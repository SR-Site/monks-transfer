import DefaultButtonController from "../DefaultButtonController";
import ButtonPlayCircleTransitionController from 'app/component/button/button-play-circle/ButtonPlayCircleTransitionController';
import IButtonPlayCircleOptions from 'app/component/button/button-play-circle/IButtonPlayCircleOptions';
import ButtonPlayCircleViewModel from 'app/component/button/button-play-circle/ButtonPlayCircleViewModel';

import Log from "lib/temple/util/Log";

class ButtonPlayCircleController extends DefaultButtonController<ButtonPlayCircleViewModel, IButtonPlayCircleOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonPlayCircle');

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
		this.transitionController = new ButtonPlayCircleTransitionController(this.element, this);

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

export default ButtonPlayCircleController;
