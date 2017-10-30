import AbstractEvent from 'seng-event/lib/AbstractEvent';
import { generateEventTypes, EVENT_TYPE_PLACEHOLDER } from 'seng-event/lib/util/eventTypeUtils';

class DraggableInstanceEvent extends AbstractEvent {
	public static UPDATE: string = EVENT_TYPE_PLACEHOLDER;
	public static COMPLETE: string = EVENT_TYPE_PLACEHOLDER;
	public static THROW_COMPLETE: string = EVENT_TYPE_PLACEHOLDER;
	public static DRAG_START: string = EVENT_TYPE_PLACEHOLDER;
	public static DRAG_END: string = EVENT_TYPE_PLACEHOLDER;
	public static SNAP_END: string = EVENT_TYPE_PLACEHOLDER;

	constructor(
		type: string,
		public data?: { progress: number },
		bubbles?: boolean,
		cancelable?: boolean,
		setTimeStamp?: boolean,
	) {
		super(type, bubbles, cancelable, setTimeStamp);
	}

	public clone(): DraggableInstanceEvent {
		return new DraggableInstanceEvent(this.type, this.data, this.bubbles, this.cancelable);
	}
}

generateEventTypes({ DraggableInstanceEvent });

export default DraggableInstanceEvent;
