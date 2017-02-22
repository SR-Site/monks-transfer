import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import Theme from "../../../data/enum/style/Theme";

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
		/**
		 * @property
		 * @description Sometimes you want to switch a color based on the background image to increase readability
		 * @placeholder 1
		 * @defaultValue 1
		 */
		theme:Theme;
	}>
}

export default IBlockStoryInfoImagesOptions;
