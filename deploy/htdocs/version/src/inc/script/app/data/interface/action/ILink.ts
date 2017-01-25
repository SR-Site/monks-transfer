import IAction from "./IAction";
import LinkType from "../../enum/type/LinkType";

interface ILink extends IAction
{
	/**
	 * @property
	 * @description The target of the link
	 * @placeholder path/to/page
	 */
	target:string;
	/**
	 * @property
	 * @description The type of the link
	 */
	type:LinkType;
	/**
	 * @ignore
	 * @property
	 * @description The deeplink data of the link
	 */
	deeplink?:Object;
}

export default ILink;
