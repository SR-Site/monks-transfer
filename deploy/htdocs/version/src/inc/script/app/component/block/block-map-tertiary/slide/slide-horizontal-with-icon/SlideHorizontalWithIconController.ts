import AbstractTransitionComponentController from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentController";


import Log from "lib/temple/util/Log";
import SlideHorizontalWithIconViewModel from "./SlideHorizontalWithIconViewModel";
import ISlideHorizontalWithIconOptions from "./ISlideHorizontalWithIconOptions";
import SlideHorizontalWithIconTransitionController from "./SlideHorizontalWithIconTransitionController";

class SlideHorizontalWithIconController extends AbstractTransitionComponentController<SlideHorizontalWithIconViewModel, ISlideHorizontalWithIconOptions, SlideHorizontalWithIconTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.SlideHorizontalWithIcon');

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
		this.transitionController = new SlideHorizontalWithIconTransitionController(this.element, this);

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

export default SlideHorizontalWithIconController;
