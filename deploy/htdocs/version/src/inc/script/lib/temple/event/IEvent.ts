import EventDispatcher from "./EventDispatcher";
import EventState from "./EventState";
import EventPhase from "./EventPhase";

interface IEvent
{
	/**
	 * The type of event.
	 */
	type:string;

	/**
	 * Indicates whether an event is a bubbling event.
	 */
	bubbles:boolean;

	/**
	 * Indicates whether the behavior associated with the event can be prevented.
	 */
	cancelable:boolean;

	/**
	 * The event target.
	 */
	target:EventDispatcher;

	/**
	 * The object that is actively processing the Event object with an event listener.
	 */
	currentTarget:EventDispatcher;

	/**
	 * Indicates the current state of the event.
	 */
	state:EventState;

	/**
	 * For bubbling events, this indicates the current event phase:<OL>
	 *    <LI> capture phase: starting from the top parent to the target</LI>
	 *    <LI> at target phase: currently being dispatched from the target</LI>
	 *    <LI> bubbling phase: from the target to the top parent</LI>
	 * </OL>
	 * @property eventPhase
	 * @type EventPhase
	 */
	eventPhase:EventPhase;

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	clone():IEvent;

	/**
	 * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow.
	 *
	 * Can only be called when the event is active, otherwise will throw an error.
	 */
	stopPropagation():void;

	/**
	 * Indicates if {{#crossLink "IEvent/stopPropagation"}}{{/crossLink}} or
	 * {{#crossLink "IEvent/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
	 */
	isPropagationStopped():boolean;

	/**
	 * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
	 *
	 * Can only be called when the event is active, otherwise will throw an error.
	 */
	stopImmediatePropagation():void;

	/**
	 * Indicates if {{#crossLink "IEvent/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
	 */
	isImmediatePropagationStopped():boolean;

	/**
	 * Cancels an event's default behavior if that behavior can be canceled.
	 *
	 * Can only be called when the event is active, otherwise will throw an error.
	 */
	preventDefault():void;

	/**
	 * Checks whether the preventDefault() method has been called on the event.
	 */
	isDefaultPrevented():boolean;

	/**
	 * Causes the active listener to be removed.
	 */
	remove():void;

	/**
	 * Indicates if {{#crossLink "IEvent/remove"}}{{/crossLink}} has been called on this event.
	 */
	isRemoved:boolean;

	/**
	 * Indicates if this event is currently active and {{#crossLink "IEvent/remove"}}{{/crossLink}},
	 * {{#crossLink "IEvent/stopPropagation"}}{{/crossLink}} or
	 * {{#crossLink "IEvent/stopImmediatePropagation"}}{{/crossLink}} can be called on this event.
	 */
	isActive():boolean;
}

export default IEvent;