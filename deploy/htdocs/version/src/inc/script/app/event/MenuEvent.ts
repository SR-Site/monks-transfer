import AbstractEvent from "../../lib/temple/event/AbstractEvent";

/**
 * @module Temple
 * @namespace temple.events
 * @class MenuEvent
 * @extend temple.events.AbstractEvent
 */
class MenuEvent extends AbstractEvent
{
	public static OPEN:string = 'open';
	public static CLOSE:string = 'close';

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():MenuEvent
	{
		return new MenuEvent(this.type, this.bubbles, this.cancelable);
	}
}

export default MenuEvent;