import AbstractTransitionComponentController from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import Log from "lib/temple/util/Log";
import SlideHorizontalWithoutIconViewModel from "./SlideHorizontalWithoutIconViewModel";
import ISlideHorizontalWithoutIconOptions from "./ISlideHorizontalWithoutIconOptions";
import SlideHorizontalWithoutIconTransitionController from "./SlideHorizontalWithoutIconTransitionController";

class SlideHorizontalWithoutIconController extends AbstractTransitionComponentController<SlideHorizontalWithoutIconViewModel, ISlideHorizontalWithoutIconOptions, SlideHorizontalWithoutIconTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.SlideHorizontalWithoutIcon');

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
		this.transitionController = new SlideHorizontalWithoutIconTransitionController(this.element, this);

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

export default SlideHorizontalWithoutIconController;
