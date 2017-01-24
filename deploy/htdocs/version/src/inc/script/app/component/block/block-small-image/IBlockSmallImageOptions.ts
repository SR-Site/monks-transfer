import IDefaultComponentOptions from "../IDefaultComponentOptions";
import Alignment from "../../../data/enum/layout/Alignment";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockSmallImageOptions extends IDefaultComponentOptions
{
	/**
	 * @property
	 * @description The alignment of the small image
	 */
	alignment: Alignment;
	/**
	 * @property
	 * @description The image displayed in the block
	 */
	image: IImage;
}

export default IBlockSmallImageOptions;
