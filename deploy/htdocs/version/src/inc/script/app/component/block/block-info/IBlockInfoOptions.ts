import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ILink from "../../../data/interface/action/ILink";

export interface IBlockInfoOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The heading displayed in the info block
	 */
	heading: string;
	/**
	 * @property
	 * @description The paragraph displayed in the info block
	 */
	paragraph: string;
	/**
	 * @property
	 * @description The link displayed in the info block
	 */
	link?: ILink;
}

export default IBlockInfoOptions;
