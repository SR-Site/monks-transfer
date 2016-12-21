import EventDispatcher from "./EventDispatcher";
import IEvent from "./IEvent";
import EventState from "./EventState";
import EventPhase from "./EventPhase";

/**
 * The AbstractEvent class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when an event occurs.
 * The properties of the AbstractEvent class carry basic information about an event, such as the event's type or whether the event's default behavior can be canceled.
 */
abstract class AbstractEvent implements IEvent
{
	/**
	 * The event target.
	 */
	public target:EventDispatcher = null;

	/**
	 * The object that is actively processing the Event object with an event listener.
	 */
	public currentTarget:EventDispatcher = null;

	/**
	 * Indicates the current state of the event.
	 */
	public state:EventState = EventState.NEW;

	/**
	 * For bubbling events, this indicates the current event phase:<OL>
	 *    <LI> capture phase: starting from the top parent to the target</LI>
	 *    <LI> at target phase: currently being dispatched from the target</LI>
	 *    <LI> bubbling phase: from the target to the top parent</LI>
	 * </OL>
	 * @property eventPhase
	 * @type EventPhase
	 */
	public eventPhase:EventPhase = EventPhase.AT_TARGET;

	/**
	 * Indicates if {{#crossLink "IEvent/remove"}}{{/crossLink}} has been called on this event.
	 */
	public isRemoved:boolean;

	private _isPropagationStopped:boolean = false;
	private _isImmediatePropagationStopped:boolean = false;
	private _isDefaultPrevented:boolean = false;

	/**
	 * Creates an Event object to pass as a parameter to event listeners.
	 * @param type The type of event.
	 * @param  (default = false) — Determines whether the Event object participates in the bubbling stage of the event
	 * flow. The default value is false.
	 * @param cancelable Determines whether the Event object can be canceled. The default values is false.
	 */
	constructor(public type:string, public bubbles:boolean = false, public cancelable:boolean = false)
	{
	}

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	abstract clone():IEvent;

	/**
	 * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow.
	 *
	 * Can only be called when the event is active, otherwise will throw an error.
	 */
	public stopPropagation():void
	{
		if (this.state != EventState.ACTIVE) throw new Error("This method can only be called when the event is active");
		this._isPropagationStopped = true;
	}

	/**
	 * Indicates if {{#crossLink "IEvent/stopPropagation"}}{{/crossLink}} or
	 * {{#crossLink "IEvent/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
	 */
	public isPropagationStopped():boolean
	{
		return this._isPropagationStopped || this._isImmediatePropagationStopped;
	}

	/**
	 * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
	 *
	 * Can only be called when the event is active, otherwise will throw an error.
	 */
	public stopImmediatePropagation():void
	{
		if (this.state != EventState.ACTIVE) throw new Error("This method can only be called when the event is active");
		this._isImmediatePropagationStopped = true;
	}

	/**
	 * Indicates if {{#crossLink "IEvent/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
	 */
	public isImmediatePropagationStopped():boolean
	{
		return this._isImmediatePropagationStopped;
	}

	/**
	 * Cancels an event's default behavior if that behavior can be canceled.
	 *
	 * Can only be called when the event is active, otherwise will throw an error.
	 */
	public preventDefault()
	{
		if (this.state != EventState.ACTIVE) throw new Error("This method can only be called when the event is active");

		this._isDefaultPrevented = true;
	}

	/**
	 * Checks whether the preventDefault() method has been called on the event.
	 */
	public isDefaultPrevented():boolean
	{
		return this._isDefaultPrevented;
	}

	/**
	 * Causes the active listener to be removed.
	 */
	public remove():void
	{
		if (this.state != EventState.ACTIVE) throw new Error("This method can only be called when the event is active");

		this.isRemoved = true;
	}

	/**
	 * Indicates if this event is currently active and {{#crossLink "IEvent/remove"}}{{/crossLink}},
	 * {{#crossLink "IEvent/stopPropagation"}}{{/crossLink}} or
	 * {{#crossLink "IEvent/stopImmediatePropagation"}}{{/crossLink}} can be called on this event.
	 */
	public isActive():boolean
	{
		return this.state == EventState.ACTIVE
	}
}

export default AbstractEvent;