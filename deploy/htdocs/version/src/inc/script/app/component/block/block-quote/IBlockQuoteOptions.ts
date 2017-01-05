import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockQuoteOptions extends IDefaultComponentOptions
{
	image:IImage;
	quote:string;
	name:string;
	description:string;
}

export default IBlockQuoteOptions;
