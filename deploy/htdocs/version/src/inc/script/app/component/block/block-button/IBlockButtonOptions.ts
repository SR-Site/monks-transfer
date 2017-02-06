import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import Alignment from "../../../data/enum/layout/Alignment";

interface IBlockButtonOptions extends IAbstractBlockComponentOptions
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
