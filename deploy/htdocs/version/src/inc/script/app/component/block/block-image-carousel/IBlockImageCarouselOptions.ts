import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import Theme from "../../../data/enum/style/Theme";

export interface IBlockImageCarouselOptions extends IAbstractBlockComponentOptions
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
		/**
		 * @property
		 * @description Sometimes you want to switch a color based on the background image to increase readability
		 * @placeholder 1
		 * @defaultValue 1
		 */
		theme:Theme;
	}>
}

export default IBlockImageCarouselOptions;
