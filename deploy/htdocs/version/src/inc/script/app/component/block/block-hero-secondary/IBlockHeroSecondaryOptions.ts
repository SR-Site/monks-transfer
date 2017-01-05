import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ILink from "../../../data/interface/action/ILink";

export interface IBlockHeroSecondaryOptions extends IDefaultComponentOptions
{
	heading: string;
	paragraph?: string;
	link: ILink;
}

export default IBlockHeroSecondaryOptions;
