import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import IVideo from "../../../data/interface/media/IVideo";

interface IBlockHeroTertiaryOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The background image displayed on the hero tertiary
	 */
	background: IImage;
	/**
	 * @property
	 * @description The slide background video, this will overrule the background image on desktop. Note that we can only use internal videos!
	 */
	backgroundVideo?:IVideo;
}

export default IBlockHeroTertiaryOptions;
