import Destructible from "lib/temple/core/Destructible";
import AbstractPageController from "./AbstractPageController";

/**
 * Abstract ViewModel class for pages. All page ViewModels should extend this class.
 *
 * @module Gaia
 * @namespace gaia.assets
 * @class AbstractPageViewModel
 * @extends temple.core.Destructible
 */
abstract class AbstractPageViewModel<T extends AbstractPageController<any>> extends Destructible
{
	/**
	 * A reference to the controller instance for this page
	 * @property controller
	 */
	public controller:T & AbstractPageController<this>;

	/**
	 * Updates the reference to the controller for this page to the controller instance provided.
	 * @param value {AbstractPageController} The controller instance
	 * @method setController
	 */
	public setController(value:T & AbstractPageController<this>):void
	{
		this.controller = value;
	}

	/**
	 * @inheritDoc
	 */
	public destruct():void
	{
		this.controller = null;

		super.destruct();
	}
}

export default AbstractPageViewModel;