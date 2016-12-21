import AbstractEvent from "../../event/AbstractEvent";

/**
 * @module Temple
 * @namespace temple.net.sockets
 * @class SocketEvent
 */
class SocketEvent extends AbstractEvent
{
	/**
	 * Dispatched when {{#crossLink "temple.net.sockets.SocketService"}}SocketService{{/crossLink}} starts connecting to the server.
	 *
	 * @static
	 * @property CONNECTING
	 * @type string
	 * @default 'SocketEvent.connecting'
	 */
	public static CONNECTING:string = 'SocketEvent.CONNECTING';

	/**
	 * Dispatched when a socket connection is established with the server.
	 *
	 * @static
	 * @property OPENED
	 * @type string
	 * @default 'SocketEvent.opened'
	 */
	public static OPENED:string = 'SocketEvent.OPENED';

	/**
	 * Dispatched when a socket connection is closed.
	 *
	 * @static
	 * @property CLOSED
	 * @type string
	 * @default 'SocketEvent.closed'
	 */
	public static CLOSED:string = 'SocketEvent.CLOSED';

	/**
	 * Dispatched when the {{#crossLink "temple.net.sockets.SocketService"}}SocketService{{/crossLink}} tries to reconnect to the server.
	 *
	 * @static
	 * @property RECONNECT
	 * @type string
	 * @default 'SocketEvent.reconnect'
	 */
	public static RECONNECT:string = 'SocketEvent.RECONNECT';

	/**
	 * Dispatched when the server doesn't return socketservers to establish a connection to.
	 *
	 * @static
	 * @property NO_SERVERS_AVAILABLE
	 * @type string
	 * @default 'SocketEvent.no_servers_available'
	 */
	public static NO_SERVERS_AVAILABLE:string = 'SocketEvent.NO_SERVERS_AVAILABLE';

	/**
	 * Dispatched when a message from the server is received.
	 *
	 * @static
	 * @property MESSAGE
	 * @type string
	 * @default 'SocketEvent.message'
	 */
	public static MESSAGE:string = 'SocketEvent.MESSAGE';

	/**
	 * Dispatched when the {{#crossLink "temple.net.sockets.SocketService"}}SocketService{{/crossLink}} can't establish a connection to the server.
	 *
	 * @static
	 * @property UNABLE_TO_CONNECT
	 * @type string
	 * @default 'SocketEvent.unable_to_connect'
	 */
	public static UNABLE_TO_CONNECT:string = 'SocketEvent.UNABLE_TO_CONNECT';

	/**
	 * Event dispatched by {{#crossLink "temple.net.sockets.SocketService"}}SocketService{{/crossLink}}.
	 *
	 * @class SocketEvent
	 * @constructor
	 * @param {string} type
	 * @param {any} [action=null]
	 * @param {any} [event=null]
	 * @param {any} [data=null]
	 * @param {Date} [time=null]
	 */
	constructor(type:string, public action:any = null, public event:any = null, public data:any = null, public time:Date = null)
	{
		super(type);
	}

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():SocketEvent
	{
		return new SocketEvent(this.type, this.action, this.event, this.data, this.time);
	}
}

export default SocketEvent;