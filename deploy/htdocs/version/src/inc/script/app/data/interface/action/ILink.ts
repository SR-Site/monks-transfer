import IAction from "./IAction";
import LinkType from "../../enum/type/LinkType";

interface ILink extends IAction
{
	target:string;
	type:LinkType;
	deeplink?:Object;
}

export default ILink;
