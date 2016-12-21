import IEvent from "./IEvent";
import AbstractEvent from "./AbstractEvent";

/**
 * The BasicEvent class is used as a basic version  of an Event class, which are passed as parameters to event listeners when an event occurs.
 * The properties of the BasicEvent class carry basic information about an event, such as the event's type or whether the event's default behavior can be canceled.
 */
class BasicEvent extends AbstractEvent implements IEvent
{
	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():BasicEvent
	{
		return new BasicEvent(this.type, this.bubbles, this.cancelable);
	}
}

export default BasicEvent;