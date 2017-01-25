import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ILink from "../../../data/interface/action/ILink";

export interface IBlockHeroSecondaryOptions extends IDefaultComponentOptions
{
	/**
	 * @property
	 * @description The main triangle background color, rgba or hexa code
	 */
	backgroundColor?: string;
	/**
	 * @property
	 * @description The main heading displayed on the hero secondary
	 */
	heading: string;
	/**
	 * @property
	 * @description The main paragraph displayed on the hero secondary
	 */
	paragraph?: string;
	/**
	 * @property
	 * @description Think added to the hero main
	 */
	link: ILink;
}

export default IBlockHeroSecondaryOptions;
