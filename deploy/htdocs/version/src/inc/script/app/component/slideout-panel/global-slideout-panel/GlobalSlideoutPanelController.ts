import Log from "../../../../lib/temple/util/Log";
import GlobalSlideoutPanelViewModel from "./GlobalSlideoutPanelViewModel";
import IGlobalSlideoutPanelOptions from "./IGlobalSlideoutPanelOptions";
import DefaultSlideoutPanelController from "../DefaultSlideoutPanelController";
import DefaultSlideoutPanelTransitionController from "../DefaultSlideoutPanelTransitionController";
import GlobalSlideoutPanelTransitionController from "./GlobalSlideoutPanelTransitionController";
import Promise = require("bluebird");

class GlobalSlideoutPanelController extends DefaultSlideoutPanelController<GlobalSlideoutPanelViewModel, IGlobalSlideoutPanelOptions, GlobalSlideoutPanelTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.SlideoutPanel');

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new DefaultSlideoutPanelTransitionController(this.element, this);

	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		// always call this last
		super.destruct();
	}
}

export default GlobalSlideoutPanelController;
