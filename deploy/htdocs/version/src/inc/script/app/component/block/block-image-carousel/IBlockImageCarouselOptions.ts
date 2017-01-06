import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockImageCarouselOptions extends IDefaultComponentOptions
{
	slides: Array<{
		heading?: string;
		image: IImage;
	}>
}

export default IBlockImageCarouselOptions;
