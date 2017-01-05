import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import ILink from "../../../data/interface/action/ILink";

export interface IBlockHeroMainOptions extends IDefaultComponentOptions
{
	heading: string;
	paragraph?: string;
	background: IImage;
	link?: ILink;
}

export default IBlockHeroMainOptions;
