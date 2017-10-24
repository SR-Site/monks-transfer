import AbstractEvent from 'seng-event/lib/AbstractEvent';
import { generateEventTypes, EVENT_TYPE_PLACEHOLDER } from 'seng-event/lib/util/eventTypeUtils';

class CarouselEvent extends AbstractEvent {
	public static NEXT: string = EVENT_TYPE_PLACEHOLDER;
	public static PREVIOUS: string = EVENT_TYPE_PLACEHOLDER;
	public static CHANGE: string = EVENT_TYPE_PLACEHOLDER;
	public static OPEN: string = EVENT_TYPE_PLACEHOLDER;

	constructor(type: string,
	            public data?: { index: number },
	            bubbles?: boolean,
	            cancelable?: boolean,
	            setTimeStamp?: boolean,) {
		super(type, bubbles, cancelable, setTimeStamp);
	}

	public clone(): CarouselEvent {
		return new CarouselEvent(this.type, this.data, this.bubbles, this.cancelable);
	}
}

generateEventTypes({ CarouselEvent });

export default CarouselEvent;

