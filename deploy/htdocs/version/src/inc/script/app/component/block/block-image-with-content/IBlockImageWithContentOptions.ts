import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import Alignment from "../../../data/enum/layout/Alignment";
import ILink from "../../../data/interface/action/ILink";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockImageWithContentOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The alignment of the image with content block
	 */
	alignment: Alignment;
	/**
	 * @property
	 * @description If this flag is set to true the client will crop out a part of the image
	 */
	croppedImage: boolean;
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
	background:IImage;
	/**
	 * @property
	 * @description The link to another page
	 */
	link?: ILink;
}

export default IBlockImageWithContentOptions;
