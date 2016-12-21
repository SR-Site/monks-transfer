import AbstractEvent from "../temple/event/AbstractEvent";

class FacebookEvent extends AbstractEvent
{
	public static LOGIN:string = "FacebookEvent.LOGIN";
	public static LOGOUT:string = "FacebookEvent.LOGOUT";

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():FacebookEvent
	{
		return new FacebookEvent(this.type, this.bubbles, this.cancelable);
	}
}

export default FacebookEvent;