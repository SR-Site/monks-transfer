import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import ILink from "../../../data/interface/action/ILink";

export interface IBlockHeroMainOptions extends IDefaultComponentOptions
{
	slides: Array<{
		heading: string;
		paragraph?: string;
		background: IImage;
		link?: ILink;
		secondaryLink?: ILink;
		statistics?: {
			heading: string;
			stats: Array<{
				heading: string;
				description: string;
				value: number;
			}>
		}
	}>
}

export default IBlockHeroMainOptions;
