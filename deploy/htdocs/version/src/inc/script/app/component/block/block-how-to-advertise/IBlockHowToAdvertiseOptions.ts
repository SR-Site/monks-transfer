import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ILink from "../../../data/interface/action/ILink";

export interface IBlockHowToAdvertiseOptions extends IDefaultComponentOptions
{
	heading: string;
	link: ILink;
	steps: Array<{
		heading: string;
		paragraph: string;
		icon: string;
	}>
}

export default IBlockHowToAdvertiseOptions;
