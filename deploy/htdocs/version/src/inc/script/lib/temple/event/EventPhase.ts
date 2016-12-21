/**
 * For bubbling events, this indicates the current event phase
 *
 * @enum EventPhase
 */
const enum EventPhase
{
	/**
	 * Starting from the top parent to the target
	 */
	CAPTURING_PHASE = 1,

	/**
	 * Currently being dispatched from the target
	 */
	AT_TARGET = 2,

	/**
	 * From the target to the top parent
	 */
	BUBBLING_PHASE = 3
}


export default EventPhase