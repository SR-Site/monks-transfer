import IEvent from "./IEvent";
import Destructible from "../core/Destructible";
import BasicEvent from "./BasicEvent";
import DataEvent from "./DataEvent";
import Log from "../util/Log";
import EventState from "./EventState";
import EventPhase from "./EventPhase";
import IDestructible from "../core/IDestructible";

let _log = new Log('lib.temple.event.EventDispatcher');

/**
 * The EventDispatcher class is the base class for all classes that dispatch events. The EventDispatcher class implements the
 * EventDispatcher interface and is the base class for the DisplayObject class. The EventDispatcher class allows any object
 * on the display list to be an event target and as such, to use the methods of the EventDispatcher interface.
 *
 * @module Temple
 * @namespace temple.event
 * @class EventDispatcher
 * @extends temple.core.Destructible
 */
class EventDispatcher extends Destructible implements EventDispatcher
{
	/**
	 * parent element, used for Event bubbling
	 */
	public parent:EventDispatcher;

	private _listeners:{[type:string]:Array<EventListenerData>};
	private _target:EventDispatcher;

	/**
	 * @class EventDispatcher
	 * @constructor
	 *
	 * @param {EventDispatcher} target The target object for events dispatched to the EventDispatcher object. This
	 * parameter is used when the EventDispatcher instance is aggregated by a class that implements EventDispatcher as
	 * interface; it is necessary so that the containing object can be the target for events. Do not use this parameter
	 * in simple cases in which a class extends EventDispatcher.
	 *
	 * @param {EventDispatcher} parent The parent object is used for event bubbling. If bubbling is enable in the event,
	 * the event will also been dispatched on the parent, after it is dispatched on this object. If the parent also has
	 * a parent, the event will also been dispatched on that parent. This will continue until all parents are handled.
	 */
	constructor(target:EventDispatcher = null, parent:EventDispatcher = null)
	{
		super();

		this._target = target || this;
		this._listeners = {};
		this.parent = parent;
	}

	/**
	 * Dispatches an event into the event flow.
	 *
	 * Returns a value of true if the event was successfully dispatched. A value of false indicates failure or that
	 * preventDefault() was called on the event.
	 *
	 * @method dispatchEvent
	 * @param {IEvent} event
	 * @returns {boolean}
	 */
	public dispatchEvent(event:IEvent):boolean
	{
		if (this.isDestructed())
		{
			_log.error("Can't dispatchEvent on a destructed EventDispatcher");
		}
		else if (this.hasEventListener(event.type) || event.bubbles && this.willTrigger(event.type))
		{
			if (event.state != EventState.NEW)
			{
				// Can only dispatch new events, so we have to make a clone now
				event = event.clone();
			}

			event.target = this._target;
			event.state = EventState.ACTIVE;

			if (!event.bubbles || !this.parent)
			{
				this._dispatchEvent(event, EventPhase.AT_TARGET);
			}
			else
			{
				// Create a list of all parents
				let top:EventDispatcher = this, parents:Array<EventDispatcher> = [];
				while(top.parent)
				{
					parents.push(top = top.parent);
				}
				let i:number, length:number = parents.length;

				// Capture phase
				for(i = length - 1; i >= 0 && !event.isPropagationStopped(); i--)
				{
					parents[i]._dispatchEvent(event, EventPhase.CAPTURING_PHASE);
				}

				// target phase
				if (!event.isPropagationStopped())
				{
					this._dispatchEvent(event, EventPhase.AT_TARGET);
				}

				// bubbling phase
				for(i = 0; i < length && !event.isPropagationStopped(); i++)
				{
					parents[i]._dispatchEvent(event, EventPhase.BUBBLING_PHASE);
				}
			}

			event.state = EventState.OLD;

			return !event.isDefaultPrevented();
		}
		else
		{
			_log.warn('trying to dispatch event that has no listeners "' + event.type + '"');
		}


		return false;
	}

	/**
	 * Shorthand function for dispatchEvent
	 * @param {string} type
	 * @param {any} data
	 * @param {boolean} bubbles
	 * @param {boolean} cancelable
	 * @returns {boolean}
	 */
	public dispatch(type:string, data?:any, bubbles:boolean = false, cancelable:boolean = false):boolean
	{
		if (this.hasEventListener(type) || (bubbles && this.willTrigger(type)))
		{
			return this.dispatchEvent(data === void 0 ? new BasicEvent(type, bubbles, cancelable) : new DataEvent(type, data, bubbles, cancelable));
		}
		return false;
	}

	/**
	 * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
	 * You can register event listeners on all nodes in the display list for a specific type of event, phase, and priority.
	 *
	 * After you successfully register an event listener, you cannot change its priority through additional calls to addEventListener().
	 * To change a listener's priority, you must first call removeEventListener(). Then you can register the listener again with the new
	 * priority level.
	 *
	 * If the event listener is being registered on a node while an event is also being processed on this node, the event listener is not
	 * triggered.
	 *
	 * If an event listener is removed from a node while an event is being processed on the node, it is still triggered by the current actions
	 * After it is removed, the event listener is never invoked again (unless it is registered again for future processing).
	 *
	 * @method addEventListener
	 * @param {string} type The type of event.
	 * @param {?} listener  The listener function that processes the event.
	 * @param (boolean) useCapture Determines whether the listener works in the capture phase or the target and bubbling phases.
	 * If useCapture is set to true, the listener processes the event only during the capture phase and not in the target or bubbling phase.
	 * If useCapture is false, the listener processes the event only during the target or bubbling phase.
	 * To listen for the event in all three phases, call addEventListener twice, once with useCapture set to true, then again with useCapture set to false.
	 * @param {number} priority  The priority level of the event listener. The higher the number, the higher the priority. All listeners
	 * with priority n are processed before listeners of priority n-1. If two or more listeners share the same priority, they
	 * are processed in the order in which they were added. The default priority is 0.
	 *
	 * @returns {IEventListenerData} an IEventListenerData object. Calling 'destruct' on this object will remove this listener.
	 */
	public addEventListener(type:string, listener:Listener, useCapture:Boolean = false, priority:number = 0):IEventListenerData
	{
		if (!(type in this._listeners) || typeof(this._listeners[type]) === 'undefined')
		{
			this._listeners[type] = [];
		}

		var eventPhase:EventPhase = useCapture ? EventPhase.CAPTURING_PHASE : EventPhase.BUBBLING_PHASE;

		for (let i = 0, l = this._listeners[type].length; i < l; ++i)
		{
			let data:EventListenerData = this._listeners[type][i]

			if (data.listener === listener && data.eventPhase === eventPhase)
			{
				// double
				_log.warn("Trying to add double listener");
				return data;
			}
		}

		let data:EventListenerData = new EventListenerData(this, type, listener, priority, eventPhase);

		this._listeners[type].push(data);
		this._listeners[type].sort(this.sort);

		return data;
	}

	/**
	 * Checks whether the EventDispatcher object has any listeners registered for a specific type of event. This allows
	 * you to determine where an EventDispatcher object has altered handling of an event type in the event flow
	 * hierarchy. To determine whether a specific event type will actually trigger an event listener, use
	 * EventDispatcher.willTrigger().
	 *
	 * The difference between hasEventListener() and willTrigger() is that hasEventListener() examines only the object
	 * to which it belongs, whereas willTrigger() examines the entire event flow for the event specified by the type
	 * parameter.
	 *
	 * @param {string} type
	 * @returns {boolean}
	 */
	public hasEventListener(type:string):boolean
	{
		return this._listeners && this._listeners[type] && this._listeners[type].length > 0;
	}

	/**
	 * Checks whether an event listener is registered with this EventDispatcher object or any of its ancestors for the
	 * specified event type. This method returns true if an event listener is triggered during any phase of the event
	 * flow when an event of the specified type is dispatched to this EventDispatcher object or any of its descendants.
	 *
	 * The difference between hasEventListener() and willTrigger() is that hasEventListener() examines only the object
	 * to which it belongs, whereas willTrigger() examines the entire event flow for the event specified by the type
	 * parameter.
	 *
	 * @param {string} type
	 * @returns {boolean}
	 */
	public willTrigger(type:string):boolean
	{
		return this.hasEventListener(type) || this.parent && this.parent.willTrigger(type);
	}

	/**
	 * Removes a listener from the EventDispatcher object. If there is no matching listener registered with the EventDispatcher object, a call to this method has no effect.
	 * @param {string} type
	 * @param {Listener} listener
	 * @param {Boolean} useCapture
	 */
	public removeEventListener(type:string, listener:Listener, useCapture:Boolean = false):void
	{
		if (this._listeners)
		{
			if ((type in this._listeners) && (this._listeners[type] instanceof Array))
			{
				for (let i = 0, l = this._listeners[type].length; i < l; ++i)
				{
					let data:EventListenerData = this._listeners[type][i];

					if (data.listener === listener && (useCapture && data.eventPhase === EventPhase.CAPTURING_PHASE || !useCapture && data.eventPhase !== EventPhase.CAPTURING_PHASE))
					{
						data.dispatcher = null;
						data.destruct();
						this._listeners[type].splice(i, 1);
						return;
					}
				}
			}
			else
			{
				_log.warn('trying to remove event that has no listeners "' + type + '"');
			}
		}
	}

	/**
	 * Removes all event listeners in this EventDispatcher. If a type is provided, only listeners for this type will be removed.
	 * @param {string} type
	 */
	public removeAllEventListeners(type?:string):void
	{
		if (this._listeners)
		{
			if (type === void 0)
			{
				for (type in this._listeners)
				{
					if (this._listeners[type] instanceof Array)
					{
						while (this._listeners[type].length)
						{
							let data:EventListenerData = this._listeners[type].shift();
							data.dispatcher = null;
							data.destruct();
						}
					}
				}
			}
			else if ((type in this._listeners) && (this._listeners[type] instanceof Array))
			{
				while (this._listeners[type].length)
				{
					let data:EventListenerData = this._listeners[type].shift();
					data.dispatcher = null;
					data.destruct();
				}
			}
			else
			{
				_log.warn('trying to remove all events that does not exist "' + type + '"');
			}
		}
	}

	private sort(e1:EventListenerData, e2:EventListenerData):number
	{
		return e2.priority - e1.priority;
	}

	private _dispatchEvent(event:IEvent, eventPhase:EventPhase):void
	{
		if (this._listeners)
		{
			if (this._listeners[event.type])
			{
				// Create a clone when eventPhase is not the AT_TARGET phase
				if (eventPhase != EventPhase.AT_TARGET)
				{
					// store the original, so we can pass the called methods to it later
					var original:IEvent = event;
					event = event.clone();
					event.target = original.target;
					event.state = EventState.ACTIVE;
				}

				event.eventPhase = eventPhase;
				event.currentTarget = this._target;

				// create a queue for the handlers, so we know that it can't be manipulated during the loop
				let listeners:Array<Listener> = [];

				let events:Array<EventListenerData> = this._listeners[event.type];

				for (let i = 0, l = events.length; i < l; ++i)
				{
					let data:EventListenerData = events[i];

					if (data.eventPhase === eventPhase || eventPhase === EventPhase.AT_TARGET && data.eventPhase === EventPhase.BUBBLING_PHASE)
					{
						listeners.push(data.listener);
						if (data.call())
						{
							// listener is removed and removed from list, so decrease iterator
							l--;
							i--;
						}
					}
				}

				event.isRemoved = false;
				for (let i = 0, l = listeners.length; i < l; ++i)
				{
					// Call listener
					listeners[i].call(null, event);

					// Remove listener is remove is called on the event
					if (event.isRemoved)
					{
						this.removeEventListener(event.type, listeners[i], eventPhase === EventPhase.CAPTURING_PHASE);
					}

					if (event.isImmediatePropagationStopped())
					{
						break;
					}
				}

				if (original)
				{
					// set changed values to original event
					if (event.isDefaultPrevented()) original.preventDefault();
					if (event.isImmediatePropagationStopped())
					{
						original.stopImmediatePropagation();
					}
					else if (event.isPropagationStopped())
					{
						original.stopPropagation();
					}
					event.state = EventState.OLD;
				}
			}
			else
			{
				_log.warn('trying to dispatch event that has no listeners "' + event.type + '"');
			}
		}
		else
		{
			_log.error("Can't dispatchEvent on a destructed EventDispatcher");
		}
	}

	/**
	 * Removes all event listeners en destructs the object
	 */
	public destruct():void
	{
		this.removeAllEventListeners();
		this._target = null;
		this._listeners = null;

		super.destruct();
	}
}

export default EventDispatcher;

/**
 * Interface for an event listener method
 */
export interface Listener
{
	(event:IEvent):void;
}

/**
 * Holds the info about an event listener. This type of object is returned with the addEventListener method
 */
export interface IEventListenerData extends IDestructible
{
	/**
	 * Indicates that the listener is automatically removed after the first time the event is dispatched.
	 */
	once():IEventListenerData;

	/**
	 * Specify an max number of call after the listener must be remove
	 *
	 * @param numCalls
	 */
	removeAfter(numCalls:uint):IEventListenerData;

	/**
	 * Returns the amount of times this listener already has been called
	 */
	getNumCalls():uint;

	/**
	 * Returns the maximum amount of times this listener can be called
	 */
	getMaxNumCalls():uint;
}

class EventListenerData implements IEventListenerData
{
	private _isDestructed:boolean = false;
	private _maxNumCalls:uint = Number.POSITIVE_INFINITY;
	private _numCalls:uint = 0;

	constructor(
		public dispatcher:EventDispatcher,
		public type:string,
		public listener:Listener,
		public priority:number,
		public eventPhase:EventPhase)
	{
	}

	public once():IEventListenerData
	{
		return this.removeAfter(1);
	}

	public removeAfter(numCalls:uint):IEventListenerData
	{
		this._maxNumCalls = numCalls;
		if (this._maxNumCalls <= this._numCalls)
		{
			this.destruct();
		}
		return this;
	}

	/**
	 * Update the numCall. Returns true if the numCalls equals the maxNumCalls and the listener is removed
	 * @private
	 * @returns {boolean}
	 */
	public call():boolean
	{
		if (++this._numCalls === this._maxNumCalls)
		{
			this.destruct();
			return true;
		}
		return false;
	}

	public getNumCalls():uint
	{
		return this._numCalls;
	}

	public getMaxNumCalls():uint
	{
		return this._maxNumCalls;
	}

	public isDestructed():boolean
	{
		return this._isDestructed;
	}

	public destruct():void
	{
		if (this.dispatcher)
		{
			this.dispatcher.removeEventListener(this.type, this.listener, this.eventPhase === EventPhase.CAPTURING_PHASE);
		}
		this.dispatcher = null;
		this.type = null;
		this.listener = null;
		this.eventPhase = null;

		this._isDestructed = true;
	}
}