import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";

interface IBlockPathToPurchaseOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The array containing all the steps
	 */
	steps: Array<{
		/**
		 * @property
		 * @description THe heading displayed in the step
		 */
		heading: string;
		/**
		 * @property
		 * @description The paragraph displayed in the step
		 */
		paragraph: string;
		/**
		 * @property
		 * @description The background image per step
		 */
		background: IImage
		/**
		 * @property
		 * @description The secondary paragraph displayed in the step
		 */
		secondaryParagraph: string;
	}>
}

export default IBlockPathToPurchaseOptions;
