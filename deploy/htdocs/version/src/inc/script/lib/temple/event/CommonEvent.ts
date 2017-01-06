import AbstractEvent from "./AbstractEvent";

/**
 * @module Temple
 * @namespace temple.events
 * @class CommonEvent
 * @extend temple.events.AbstractEvent
 */
class CommonEvent extends AbstractEvent
{
	public static COMPLETE:string = 'complete';
	public static UPDATE:string = 'update';
	public static INIT:string = 'init';
	public static CHANGE:string = 'change';
	public static OPEN:string = 'open';
	public static CLOSE:string = 'close';
	public static RESIZE:string = 'resize';
	public static LOADED:string = 'loaded';

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():CommonEvent
	{
		return new CommonEvent(this.type, this.bubbles, this.cancelable);
	}
}

export default CommonEvent;