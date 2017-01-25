import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockHeroTertiaryOptions extends IDefaultComponentOptions
{
	/**
	 * @property
	 * @description The background image displayed on the hero tertiary
	 */
	background: IImage;
}

export default IBlockHeroTertiaryOptions;
