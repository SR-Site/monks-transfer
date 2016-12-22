import Destructible from "lib/temple/core/Destructible";
import AbstractComponentController from "./AbstractComponentController";
import ButtonSize from "../../../app/data/enum/layout/ButtonSize";

/**
 * Abstract viewModel class for components. All component ViewModels should extend this class.
 *
 * @namespace temple.component
 * @class AbstractComponentViewModel
 * @extend temple.events.EventDispatcher
 */
abstract class AbstractComponentViewModel<T extends AbstractComponentController<any, any>, U> extends Destructible
{
	public ButtonSize: Enum = ButtonSize;

	/**
	 * Reference to the controller instance for this component.
	 *
	 * @property controller
	 */
	public controller: T & AbstractComponentController<this, U>;

	/**
	 * Sets the reference to the controller instance for this component.
	 * @param controller The controller instance
	 * @method setController
	 */
	public setController(controller: T & AbstractComponentController<this, U>)
	{
		this.controller = controller;
	}

	/**
	 * @public
	 * @method data
	 * @description shorthand method to get the component options, which contains the backend data
	 * @returns {any}
	 */
	public get data(): U
	{
		return this.controller.options;
	}

	/**
	 * @inheritDoc
	 */
	public destruct(): void
	{
		this.ButtonSize = null;

		this.controller = null;

		super.destruct();
	}
}

export default AbstractComponentViewModel;