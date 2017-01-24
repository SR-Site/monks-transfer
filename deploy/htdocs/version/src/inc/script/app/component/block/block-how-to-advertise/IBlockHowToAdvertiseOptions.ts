import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ILink from "../../../data/interface/action/ILink";

export interface IBlockHowToAdvertiseOptions extends IDefaultComponentOptions
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
		heading: string;
		paragraph: string;
		icon: string;
	}>
}

export default IBlockHowToAdvertiseOptions;
