import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import Alignment from "../../../data/enum/layout/Alignment";
import IImage from "../../../data/interface/media/IImage";

interface IBlockSmallImageOptions extends IAbstractBlockComponentOptions
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
