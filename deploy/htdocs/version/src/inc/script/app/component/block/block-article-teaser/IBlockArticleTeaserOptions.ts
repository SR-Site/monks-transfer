import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import ITag from "../../../data/interface/action/ITag";

export interface IBlockArticleTeaserOptions extends IDefaultComponentOptions
{
	/**
	 * @property
	 * @description The main heading displayed
	 */
	heading: string;
	/**
	 * @property
	 * @description The main paragraph displayed
	 */
	paragraph: string;
	/**
	 * @property
	 * @description The target that the teaser should link to
	 */
	target:string;
	/**
	 * @property
	 * @description The image that will be displayed in the article teaser
	 */
	image: IImage;
	/**
	 * @property
	 * @description The tags linked to this article
	 */
	tags: Array<ITag>;
}

export default IBlockArticleTeaserOptions;
