import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockStoryInfoImagesOptions extends IDefaultComponentOptions
{
	stories:Array<{
		heading:string;
		paragraph:string;
		background:IImage;
		backgroundBlurred:IImage;
	}>
}

export default IBlockStoryInfoImagesOptions;
