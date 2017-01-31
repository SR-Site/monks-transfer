import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockPageNotFoundOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The error code causing the issue
	 */
	errorCode:number;
	/**
	 * @property
	 * @description The main heading displayed on the error block
	 */
	heading:string;
	/**
	 * @property
	 * @description The paragraph displayed on the error block
	 */
	paragraph:string;
	/**
	 * @property
	 * @description The image displayed on the background of the error block
	 */
	image:IImage;
	/**
	 * @property
	 * @description The link added to the block
	 */
	link:ILink;
}

export default IBlockPageNotFoundOptions;
