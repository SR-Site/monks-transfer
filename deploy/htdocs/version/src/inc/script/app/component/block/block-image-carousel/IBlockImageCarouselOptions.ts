import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockImageCarouselOptions extends IDefaultComponentOptions
{

	/**
	 * @property
	 * @description The array containing the slides
	 * @defaultValue []
	 */
	slides: Array<{
		/**
		 * @property
		 * @description The heading displayed on the slide
		 */
		heading?: string;
		/**
		 * @property
		 * @description The image displayed on the slide
		 */
		image: IImage;
	}>
}

export default IBlockImageCarouselOptions;
