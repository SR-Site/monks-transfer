import MouseEvents from "../../lib/temple/event/MouseEvents";
import TouchEvents from "../../lib/temple/event/TouchEvents";
import bowser = require('bowser');

/**
 * @class RedrawHelper
 * @description This class is a place we can add forced redraws on certain elements.
 */
class MouseEventHelper
{
	private static isTouch: boolean = bowser.mobile || bowser.tablet;

	/**
	 * @public
	 * @method pageX
	 * @description different devices have different ways of fetching the pageX
	 */
	public static pageX(event: MouseEvent): number
	{
		if(event.pageX !== undefined)
		{
			return event.pageX
		}
		else if(event['touches'][0].pageX !== undefined)
		{
			return event['touches'][0].pageX;
		}
		else if(event['originalEvent']['touches'][0].pageX)
		{
			return event['originalEvent']['touches'][0].pageX;
		}
		else
		{
			console.warn('[MouseEventHelper] No page x');

			return 0;
		}
	}

	public static MOUSEENTER: string = MouseEventHelper.isTouch ? TouchEvents.START : MouseEvents.MOUSEENTER;

	public static MOUSELEAVE: string = MouseEventHelper.isTouch ? TouchEvents.END : MouseEvents.MOUSELEAVE;

	public static MOUSEDOWN: string = MouseEventHelper.isTouch ? TouchEvents.START : MouseEvents.MOUSEDOWN;

	public static MOUSEUP: string = MouseEventHelper.isTouch ? TouchEvents.END : MouseEvents.MOUSEUP;

	public static MOUSEMOVE: string = MouseEventHelper.isTouch ? TouchEvents.MOVE : MouseEvents.MOUSEMOVE;

	public static CLICK: string = MouseEventHelper.isTouch ? TouchEvents.TAP : MouseEvents.CLICK;
}

export default MouseEventHelper;
