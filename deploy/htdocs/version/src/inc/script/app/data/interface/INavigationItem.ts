import ILink from "./action/ILink";

interface INavigationItem
{
	link: ILink;
	subtitle?: string;
}

export default INavigationItem;