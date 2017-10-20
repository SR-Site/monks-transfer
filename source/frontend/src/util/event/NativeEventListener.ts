import Disposable from 'seng-disposable/lib/Disposable';

/**
 * The NativeEventListener is a wrapper around the native addEventListener method of an HTML element and makes it easier
 * to remove the handlers. By destructing this object, the listener is removed from the HTML element.
 *
 * @example
 * ```
 * // Add a resize listener on the window
 * var resizeListener:NativeEventListener = new NativeEventListener(window, "resize", this.handleResize);
 *
 * // remove the resize listener
 * resizeListener.destruct();
 * ```
 *
 * @class NativeEventListener
 */

export default class NativeEventListener extends Disposable
{
	private _isDestructed:boolean = false;

	/**
	 * Add an event listener on a HTML element.
	 *
	 * @param {NativeEventDispatcher} eventDispatcher the HTML element to listen to.
	 * @param {string} type the type of event to listen to.
	 * @param {EventListener} listener the method which is called when the eventDispatcher dispatches an event to the
	 * specified type
	 * @param {boolean} useCapture If true, useCapture indicates that the user wishes to initiate capture. After
	 * initiating capture, all events of the specified type will be dispatched to the registered listener before being
	 * dispatched to any EventTarget beneath it in the DOM tree. Events which are bubbling upward through the tree will
	 * not trigger a listener designated to use capture.
	 */
	constructor(
		public eventDispatcher:EventTarget,
		public type:string,
		public listener:EventListenerOrEventListenerObject,
		public useCapture?:boolean,
	)
	{
		super();

		eventDispatcher.addEventListener(type, listener, useCapture);
	}

	/**
	 * Removes the event listener on the HTML element
	 */
	public dispose():void
	{
		if (this.eventDispatcher && this.type && this.listener)
		{
			this.eventDispatcher.removeEventListener(this.type, this.listener, this.useCapture);
		}
		this.eventDispatcher  = null;
		this.type = null;
		this.listener = null;

		this._isDestructed = true;

		super.dispose();
	}
}
