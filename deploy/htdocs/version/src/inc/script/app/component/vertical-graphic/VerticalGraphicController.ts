import AbstractTransitionComponentController from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import VerticalGraphicTransitionController from 'app/component/vertical-graphic/VerticalGraphicTransitionController';
import IVerticalGraphicOptions from 'app/component/vertical-graphic/IVerticalGraphicOptions';
import VerticalGraphicViewModel from 'app/component/vertical-graphic/VerticalGraphicViewModel';

import Log from "lib/temple/util/Log";

class VerticalGraphicController extends AbstractTransitionComponentController<VerticalGraphicViewModel, IVerticalGraphicOptions, VerticalGraphicTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.VerticalGraphic');

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
		this.transitionController = new VerticalGraphicTransitionController(this.element, this);

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

export default VerticalGraphicController;
