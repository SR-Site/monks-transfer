import ITask from "lib/temple/control/sequence/task/ITask";
import AbstractEvent from "../../../event/AbstractEvent";

class TaskEvent extends AbstractEvent
{
	public static DONE:string = "TaskEvent.DONE";
	public static START:string = "TaskEvent.START";
	public static ERROR:string = "TaskEvent.ERROR";
	public static UPDATE:string = "TaskEvent.UPDATE";

	/**
	 * @param type the type of the event
	 * @param task the task that <i>originally</i> generated the event (explicitly, instead of using event.target)
	 * @param message an optional message, mainly used with error event types.
	 */
	constructor(type:string, public task:ITask, public message:string = null)
	{
		super(type);
	}

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():TaskEvent
	{
		return new TaskEvent(this.type, this.task, this.message);
	}
}

export default TaskEvent;