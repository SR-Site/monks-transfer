import DefaultPageController from "app/page/DefaultPageController";
import IndexPageViewModel from "app/page/index/IndexPageViewModel";
import CallbackCounter from "../../util/CallbackCounter";
import * as Gaia from "lib/gaia/api/Gaia";
import Promise = require("bluebird");
import ko = require("knockout");

class IndexPageController extends DefaultPageController<IndexPageViewModel>
{
	/**
	 * @public
	 * @property callbackCounter
	 * @type {CallbackCounter}
	 */
	public callbackCounter:CallbackCounter = new CallbackCounter();
	/**
	 * @private
	 * @property _beforeGoto
	 */
	private _beforeGoto: (removeHijack?: boolean)=>void;
	/**
	 * @private
	 * @property_beforeTransitionIn
	 */
	private _beforeTransitionIn: (removeHijack?: boolean)=>void;

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._beforeTransitionIn = Gaia.api.beforeTransitionIn(this.handleBeforeTransitionIn.bind(this), true);
	}

	/**
	 * @private
	 * @method handleBeforeTransitionIn
	 */
	private handleBeforeTransitionIn(): void
	{
		const allComponentsLoaded = this.callbackCounter.count > 0 ? this.callbackCounter.promise : Promise.resolve();

		// Wait  for all components to be loaded
		allComponentsLoaded.then(() => this._beforeTransitionIn(true))
	}

	/**
	 *	Overrides AbstractPageController.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		if(this.callbackCounter)
		{
			this.callbackCounter.destruct();
			this.callbackCounter = null;
		}

		// always call this last
		super.destruct();
	}
}

export default IndexPageController;