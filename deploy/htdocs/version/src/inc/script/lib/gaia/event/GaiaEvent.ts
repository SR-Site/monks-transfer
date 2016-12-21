import IRouteResultItem from 'lib/gaia/router/IRouteResultItem';
import Flow from '../flow/Flow';
import AbstractEvent from "../../temple/event/AbstractEvent";

class GaiaEvent extends AbstractEvent
{
	public static GOTO:string = "goto";
	public static BEFORE_GOTO:string = "beforeGoto";
	public static AFTER_GOTO:string = "afterGoto";
	public static BEFORE_TRANSITION_OUT:string = "beforeTransitionOut";
	public static AFTER_TRANSITION_OUT:string = "afterTransitionOut";
	public static BEFORE_PRELOAD:string = "beforePreload";
	public static AFTER_PRELOAD:string = "afterPreload";
	public static BEFORE_TRANSITION:string = "beforeTransition";
	public static AFTER_TRANSITION:string = "afterTransition";
	public static BEFORE_TRANSITION_IN:string = "beforeTransitionIn";
	public static AFTER_TRANSITION_IN:string = "afterTransitionIn";
	public static AFTER_COMPLETE:string = "afterComplete";

	constructor(type:string,
		public routeResult:IRouteResultItem,
		public external:boolean,
		public src:string,
		public flow:Flow = null,
		public window:string = "_self",
		public queryString:string = null,
		public replace:boolean = false)
	{
		super(type);
	}

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():GaiaEvent
	{
		return new GaiaEvent(this.type,
			this.routeResult,
			this.external,
			this.src,
			this.flow,
			this.window,
			this.queryString,
			this.replace);
	}
}

export default GaiaEvent;