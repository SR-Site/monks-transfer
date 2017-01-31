import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ILink from "../../../data/interface/action/ILink";

export interface IBlockSmallInfoOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The main heading displayed in this block
	 */
	heading: string;
	/**
	 * @property
	 * @description The main paragraph displayed in this block
	 */
	paragraph: string;
	/**
	 * @property
	 * @description The link that is added to this block
	 */
	link?: ILink;
}

export default IBlockSmallInfoOptions;
