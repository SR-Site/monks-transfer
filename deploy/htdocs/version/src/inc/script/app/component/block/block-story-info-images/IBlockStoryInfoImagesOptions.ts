import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockStoryInfoImagesOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The array containing the stories displayed in this block, todo: add support for nested types
	 */
	stories:Array<{
		heading:string;
		paragraph:string;
		background:IImage;
		backgroundBlurred:IImage;
	}>
}

export default IBlockStoryInfoImagesOptions;
