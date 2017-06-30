import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import Alignment from "../../../data/enum/layout/Alignment";
import ILink from "../../../data/interface/action/ILink";
import IImage from "../../../data/interface/media/IImage";
import IVideo from "../../../data/interface/media/IVideo";

interface IBlockVideoWithContentOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The alignment of the image with content block
	 */
	alignment:Alignment;
	/**
	 * @property
	 * @description The heading displayed in the block
	 */
	heading: string;
	/**
	 * @property
	 * @description The paragraph displayed in the block
	 */
	paragraph: string;
	/**
	 * @property
	 * @description The background image added to the block
	 */
	poster:IImage;
	/**
	 * @property
	 * @description The video played in the block
	 */
	video:IVideo;
	/**
	 * @property
	 * @description The link to another page
	 */
	link?: ILink;
}

export default IBlockVideoWithContentOptions;