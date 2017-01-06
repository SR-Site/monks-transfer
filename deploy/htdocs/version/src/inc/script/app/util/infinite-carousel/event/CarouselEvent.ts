import AbstractEvent from "../../../../lib/temple/event/AbstractEvent";

class CarouselEvent extends AbstractEvent
{
	public static NEXT:string = 'CarouselEvent.NEXT';
	public static PREVIOUS:string = 'CarouselEvent.PREVIOUS';
	public static CHANGE:string = 'CarouselEvent.CHANGE';
	public static OPEN:string = 'CarouselEvent.OPEN';

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():CarouselEvent
	{
		return new CarouselEvent(this.type, this.bubbles, this.cancelable);
	}
}

export default CarouselEvent;