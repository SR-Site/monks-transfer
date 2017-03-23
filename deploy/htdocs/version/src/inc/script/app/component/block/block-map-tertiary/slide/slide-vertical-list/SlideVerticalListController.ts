import Log from "lib/temple/util/Log";
import SlideVerticalListViewModel from "./SlideVerticalListViewModel";
import ISlideVerticalListOptions from "./ISlideVerticalListOptions";
import SlideVerticalListTransitionController from "./SlideVerticalListTransitionController";
import AbstractTransitionComponentController from "../../../../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";

class SlideVerticalListController extends AbstractTransitionComponentController<SlideVerticalListViewModel, ISlideVerticalListOptions, SlideVerticalListTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.SlideVerticalList');

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
		this.transitionController = new SlideVerticalListTransitionController(this.element, this);

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

export default SlideVerticalListController;
