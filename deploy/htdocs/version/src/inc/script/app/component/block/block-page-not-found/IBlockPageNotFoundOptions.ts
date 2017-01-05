import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockPageNotFoundOptions extends IDefaultComponentOptions
{
	errorCode:number;
	heading:string;
	paragraph:string;
	image:IImage;
	link:ILink;
}

export default IBlockPageNotFoundOptions;
