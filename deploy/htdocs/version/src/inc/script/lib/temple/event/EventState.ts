/**
 * Possible values for the state of an event
 *
 * @enum EventState
 */
const enum EventState
{
	/**
	 * The event has not been dispachted
	 */
	NEW,

	/**
	 * The event is currently being dispatched
	 */
	ACTIVE,

	/**
	 * The event has been dispachted
	 */
	OLD
}


export default EventState