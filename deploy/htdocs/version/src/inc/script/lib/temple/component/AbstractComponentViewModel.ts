import Destructible from "lib/temple/core/Destructible";
import AbstractComponentController from "./AbstractComponentController";
import ButtonSize from "../../../app/data/enum/layout/ButtonSize";
import {mediaQueries, DeviceState} from "../../../app/data/scss-shared/MediaQueries";
import DataManager from "../../../app/data/DataManager";
import Theme from "../../../app/data/enum/style/Theme";
import Direction from "../../../app/data/enum/layout/Direction";
import bowser = require('bowser');
import Orientation from "../../../app/data/enum/layout/Orientation";

/**
 * Abstract viewModel class for components. All component ViewModels should extend this class.
 *
 * @namespace temple.component
 * @class AbstractComponentViewModel
 * @extend temple.events.EventDispatcher
 */
abstract class AbstractComponentViewModel<T extends AbstractComponentController<any, any>, U> extends Destructible
{
	public MediaQueries:Class = mediaQueries;
	public ButtonSize: Enum = ButtonSize;
	public Theme: Enum = Theme;
	public Direction:Enum = Direction;
	public Bowser:Class = bowser;
	public Orientation:Enum = Orientation;

	public deviceState:KnockoutObservable<DeviceState> = DataManager.getInstance().deviceStateTracker.currentState;

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
		this.Theme = null;
		this.deviceState = null;
		this.MediaQueries = null;

		this.controller = null;

		super.destruct();
	}
}

export default AbstractComponentViewModel;
