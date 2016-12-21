import IRouteResultItem from "../router/IRouteResultItem";
import GaiaEvent from "../event/GaiaEvent";

import EventDispatcher from "lib/temple/event/EventDispatcher";

interface IGaiaHistory extends EventDispatcher
{
	getHistory():Array<IRouteResultItem>;

	getHistoryPointer():number;

	getDeeplink():{[param:string]:any};

	//init(beforeStart:(route:string, validBranch:string, deeplink?:{[param:string]:any}) => string):void;

	onGoto(event:GaiaEvent):void;

	back():void;

	forward():void;

	jump(steps:number):void;

	/* internal */ onChange(routeResult:IRouteResultItem):void;
}

export default IGaiaHistory;