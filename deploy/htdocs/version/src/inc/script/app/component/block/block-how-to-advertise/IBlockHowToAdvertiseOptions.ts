import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ILink from "../../../data/interface/action/ILink";

export interface IBlockHowToAdvertiseOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The heading displayed on the how to block
	 */
	heading: string;
	/**
	 * @property
	 * @description The link displayed in the how to block
	 */
	link: ILink;
	/**
	 * @property
	 * @description The steps displayed in the block
	 */
	steps: Array<{
		/**
		 * @property
		 * @description The heading displayed on the step
		 */
		heading: string;
		/**
		 * @property
		 * @description The paragraph displayed on the step
		 */
		paragraph: string;
		/**
		 * @property
		 * @description the icon displayed on the step, ask front-end for the available icons
		 */
		icon: string;
	}>
}

export default IBlockHowToAdvertiseOptions;
