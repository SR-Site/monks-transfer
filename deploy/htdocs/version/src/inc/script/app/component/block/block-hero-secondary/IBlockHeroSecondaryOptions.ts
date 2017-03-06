import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import IImage from "../../../data/interface/media/IImage";
import IVideo from "../../../data/interface/media/IVideo";

interface IBlockHeroSecondaryOptions extends IAbstractBlockComponentOptions
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
	link?: ILink;
	/**
	 * @property
	 * @description The background image
	 */
	background: IImage;
	/**
	 * @property
	 * @description The slide background video, this will overrule the background image on desktop. Note that we can only use internal videos!
	 */
	backgroundVideo?:IVideo;
}

export default IBlockHeroSecondaryOptions;
