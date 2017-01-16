import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import ITag from "../../../data/interface/action/ITag";

export interface IBlockArticleTeaserOptions extends IDefaultComponentOptions
{
	heading: string;
	paragraph: string;
	image: IImage;
	tags: Array<ITag>;
}

export default IBlockArticleTeaserOptions;
