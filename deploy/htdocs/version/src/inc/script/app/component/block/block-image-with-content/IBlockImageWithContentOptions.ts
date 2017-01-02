import IDefaultComponentOptions from "../IDefaultComponentOptions";
import Alignment from "../../../data/enum/layout/Alignment";
import ILink from "../../../data/interface/action/ILink";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockImageWithContentOptions extends IDefaultComponentOptions
{
	alignment: Alignment;
	windowed: boolean;
	croppedImage: boolean;
	heading: string;
	paragraph: string;
	background:IImage;
	link?: ILink;
}

export default IBlockImageWithContentOptions;
