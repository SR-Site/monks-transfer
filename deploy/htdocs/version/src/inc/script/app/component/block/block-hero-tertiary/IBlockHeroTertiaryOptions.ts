import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockHeroTertiaryOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The background image displayed on the hero tertiary
	 */
	background: IImage;
}

export default IBlockHeroTertiaryOptions;
