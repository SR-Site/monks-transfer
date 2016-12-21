import Destructible from "lib/temple/core/Destructible";
import AbstractComponentController from "./AbstractComponentController";

/**
 * Abstract viewModel class for components. All component ViewModels should extend this class.
 *
 * @namespace temple.component
 * @class AbstractComponentViewModel
 * @extend temple.events.EventDispatcher
 */
abstract class AbstractComponentViewModel<T extends AbstractComponentController<any, any>, U> extends Destructible
{
	/**
	 * Reference to the controller instance for this component.
	 *
	 * @property controller
	 */
	public controller:T & AbstractComponentController<this, U>;

	/**
	 * Sets the reference to the controller instance for this component.
	 * @param controller The controller instance
	 * @method setController
	 */
	public setController(controller:T & AbstractComponentController<this, U>)
	{
		this.controller = controller;
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

export default AbstractComponentViewModel;