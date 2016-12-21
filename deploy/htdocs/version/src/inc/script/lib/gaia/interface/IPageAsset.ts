import EventDispatcher from "lib/temple/event/EventDispatcher";
import IEvent from "lib/temple/event/IEvent";
import AbstractPageController from "../asset/AbstractPageController";
import PageType from "./PageType";

interface IPageAsset extends EventDispatcher
{
	defaultChild:string;
	landing:boolean;
	active:boolean;

	id:string;
	title:string;
	container:string;
	controllerName:string;
	viewModelName:string;
	template:string;
	type:PageType;
	data:any;
	partials:{
		app?: Array<string>;
		mobile?: Array<string>;
	};

	pages:{
		[index: string]: IPageAsset;
	};
	assets:{
		[index: string]: IPageAsset;
	};

	isTransitionedIn:boolean;

	_onProgressDelegate:(event:IEvent) => void;
	_onCompleteDelegate:(event:IEvent) => void;
	_onErrorDelegate:(event:IEvent) => void;

	_onGaiaHistoryDelegate:(event:IEvent) => void;
	_onTransitionCompleteDelegate:(event:IEvent) => void;
	_onTransitionInCompleteDelegate:(event:IEvent) => void;
	_onTransitionOutCompleteDelegate:(event:IEvent) => void;

	init():void;

	getBranch():string;
	getContent():AbstractPageController<any>;
	getData(key?:string, inherit?:boolean):any;

	parent:IPageAsset;

	preload():void;

	initPage():void;

	transition():void;
	transitionIn():void;
	transitionOut():void;

	onComplete():void;

	isPopup():boolean;
}

export default IPageAsset;