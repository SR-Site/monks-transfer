import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import ILink from "../../../data/interface/action/ILink";
import Theme from "../../../data/enum/style/Theme";

interface IBlockImageCallToActionsOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The array containing all the call to actions
	 * @defaultValue []
	 */
	callToActions: Array<{
		/**
		 * @property
		 * @description The heading displayed on the call to action
		 */
		heading: string;
		/**
		 * @property
		 * @description The paragraph displayed on the paragraph
		 */
		paragraph: string;
		/**
		 * @property
		 * @description The default background image displayed on the call to action
		 */
		background: IImage
		/**
		 * @property
		 * @description The blurred version of the background image displayed on the call to action
		 */
		backgroundBlurred: IImage;
		/**
		 * @property
		 * @description Link
		 */
		link: ILink;
		/**
		 * @property
		 * @description Sometimes you want to switch a color based on the background image to increase readability
		 * @placeholder 1
		 * @defaultValue 1
		 */
		theme:Theme;
	}>
}

export default IBlockImageCallToActionsOptions;
