import AbstractTransitionComponentController from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentController";

import Log from "lib/temple/util/Log";
import SlideVerticalGraphicViewModel from "./SlideVerticalGraphicViewModel";
import ISlideVerticalGraphicOptions from "./ISlideVerticalGraphicOptions";
import SlideVerticalGraphicTransitionController from "./SlideVerticalGraphicTransitionController";

class SlideVerticalGraphicController extends AbstractTransitionComponentController<SlideVerticalGraphicViewModel, ISlideVerticalGraphicOptions, SlideVerticalGraphicTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.SlideVerticalGraphic');

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
		this.transitionController = new SlideVerticalGraphicTransitionController(this.element, this);

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

export default SlideVerticalGraphicController;
