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
	 * @placeholder 0
	 */
	type:LinkType;
	/**
	 * @ignore
	 * @property
	 * @description The deeplink data of the link
	 */
	deeplink?:any;
}

export default ILink;
