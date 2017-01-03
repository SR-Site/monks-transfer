/**
 * This class contains the possible values for a TouchEvent. The TouchEvent interface represents events that occur due
 * to the user interacting with a touch device.
 *
 * @example
 * ```
 * this.element.addEventListener(TouchEvents.START, <any>this.handleTouchStart.bind(this));
 * ```
 *
 * @module Temple
 * @namespace temple.events
 * @class TouchEvents
 */
class TouchEvents
{
	/**
	 * The touchstart event is fired when a touch point is placed on the touch surface.
	 * This event bubbles and is cancelable.
	 *
	 * @property START
	 * @type {string}
	 * @static
	 */
	public static START:string = 'touchstart';

	/**
	 * The touchend event is fired when a touch point is removed from the touch surface.
	 * This event bubbles and is cancelable.
	 *
	 * @property END
	 * @type {string}
	 * @static
	 */
	public static END:string = 'touchend';

	/**
	 * The touchmove event is fired when a touch point is moved along the touch surface.
	 * This event bubbles and is cancelable.
	 *
	 * @property MOVE
	 * @type {string}
	 * @static
	 */
	public static MOVE:string = 'touchmove';

	/**
	 * The touchcancel event is fired when a touch point has been disrupted in an implementation-specific manner (too many touch points for example)
	 * This event bubbles and is not cancelable.
	 *
	 * @property CANCEL
	 * @type {string}
	 * @static
	 */
	public static CANCEL:string = 'cancel';

	/**
	 * @property TAP
	 * @type {string}
	 * @static
	 */
	public static TAP:string = 'tap';
}

export default TouchEvents;