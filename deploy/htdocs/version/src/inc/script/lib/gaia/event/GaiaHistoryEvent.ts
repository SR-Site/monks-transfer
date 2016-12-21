import IRouteResultItem from '../router/IRouteResultItem';
import AbstractEvent from "../../temple/event/AbstractEvent";

class GaiaHistoryEvent extends AbstractEvent
{
	public static DEEPLINK:string = "GaiaHistoryEvent.DEEPLINK";
	public static GOTO:string = "GaiaHistoryEvent.GOTO";

	constructor(type:string, public routeResult:IRouteResultItem)
	{
		super(type);

		this.routeResult = routeResult;
	}

	/**
	 * Duplicates an instance of an Event subclass.
	 */
	public clone():GaiaHistoryEvent
	{
		return new GaiaHistoryEvent(this.type, this.routeResult);
	}
}

export default GaiaHistoryEvent;