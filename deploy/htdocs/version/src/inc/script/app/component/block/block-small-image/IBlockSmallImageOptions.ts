import IDefaultComponentOptions from "../IDefaultComponentOptions";
import Alignment from "../../../data/enum/layout/Alignment";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockSmallImageOptions extends IDefaultComponentOptions
{
	alignment: Alignment;
	image: IImage;
}

export default IBlockSmallImageOptions;
