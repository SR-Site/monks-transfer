import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import ITag from "../../../data/interface/action/ITag";

interface IBlockArticleTeaserOptions extends IAbstractBlockComponentOptions
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
