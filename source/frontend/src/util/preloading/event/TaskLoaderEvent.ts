import AbstractEvent from 'seng-event/lib/AbstractEvent';
import { generateEventTypes, EVENT_TYPE_PLACEHOLDER } from 'seng-event/lib/util/eventTypeUtils';

class TaskLoaderEvent extends AbstractEvent {
	public static START: string = EVENT_TYPE_PLACEHOLDER;
	public static UPDATE: string = EVENT_TYPE_PLACEHOLDER;
	public static COMPLETE: string = EVENT_TYPE_PLACEHOLDER;

	constructor(type: string,
	            public data?: { progress: number },
	            bubbles?: boolean,
	            cancelable?: boolean,
	            setTimeStamp?: boolean,) {
		super(type, bubbles, cancelable, setTimeStamp);
	}

	public clone(): TaskLoaderEvent {
		return new TaskLoaderEvent(this.type, this.data, this.bubbles, this.cancelable);
	}
}

generateEventTypes({ TaskLoaderEvent });

export default TaskLoaderEvent
