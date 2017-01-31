import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockHeroSecondaryOptions extends IAbstractBlockComponentOptions
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
	/**
	 * @property
	 * @description The background image
	 */
	background: IImage;

}

export default IBlockHeroSecondaryOptions;
