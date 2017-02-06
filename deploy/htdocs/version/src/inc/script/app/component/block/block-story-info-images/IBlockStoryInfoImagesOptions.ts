import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";

interface IBlockStoryInfoImagesOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The array containing the stories displayed in this block, todo: add support for nested types
	 */
	stories:Array<{
		/**
		 * @property
		 * @description The heading for the story
		 */
		heading:string;
		/**
		 * @property
		 * @description The paragraph for the story
		 */
		paragraph:string;
		/**
		 * @property
		 * @description The background image for the story
		 */
		background:IImage;
		/**
		 * @property
		 * @description The blurred version of the image
		 */
		backgroundBlurred:IImage;
	}>
}

export default IBlockStoryInfoImagesOptions;
