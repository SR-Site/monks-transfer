import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import Alignment from "../../../data/enum/layout/Alignment";

export interface IBlockButtonOptions extends IDefaultComponentOptions
{
	/**
	 * @property
	 * @description The link that will be linked to the button
	 */
	link: ILink;
	/**
	 * @property
	 * @description The alignment of the button inside the block
	 */
	alignment: Alignment;
}

export default IBlockButtonOptions;
