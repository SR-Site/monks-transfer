import ILink from "./action/ILink";

interface INavigationItem
{
	/**
	 * @description The link for the main navigation item
	 */
	link: ILink;
	/**
	 * @description The subtitle of the main navigation item
	 */
	subtitle?: string;
}

export default INavigationItem;