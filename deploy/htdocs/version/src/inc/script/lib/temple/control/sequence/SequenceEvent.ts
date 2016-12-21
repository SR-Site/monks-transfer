import ITask from "lib/temple/control/sequence/task/ITask";
import AbstractEvent from "../../event/AbstractEvent";

/**
 * SequenceEvent is an event that will be dispatched by a Sequence.
 * Since a sequence holds tasks to be executed, it has a reference to the task that is responsible for generating the event.
 *
 * @author Rolf Vreijdenberger
 */
class SequenceEvent extends AbstractEvent
{
	/**
	 * sequence error, abort sequence
	 */
	public static ERROR:string = "SequenceEvent.ERROR";

	/**
	 * task error, do not abort sequence
	 */
	public static ERROR_NON_BLOCKING:string = "SequenceEvent.ERROR_NON_BLOCKING";

	/**
	 * sequence is done
	 */
	public static DONE:string = "SequenceEvent.DONE";

	/**
	 * ready for the next task in sequence
	 */
	public static NEXT:string = "SequenceEvent.NEXT";

	/**
	 * sequence started
	 */
	public static START:string = "SequenceEvent.START";
	public static UPDATE:string = "SequenceEvent.UPDATE";

	/**
	 * @param type the type of the event
	 * @param task the task that is relevant for the context of the event.
	 * @param message an optional message, mainly used with error event types.
	 */
    constructor(type:string, public task:ITask, public message:string = null)
	{
		super(type);
	}

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():SequenceEvent
	{
		return new SequenceEvent(this.type, this.task, this.message);
	}
}

export default SequenceEvent;