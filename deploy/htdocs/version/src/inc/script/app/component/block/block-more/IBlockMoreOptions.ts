import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ITag from "../../../data/interface/action/ITag";
import IArticleTeaser from "../../../data/interface/media/IArticleTeaser";
import IImage from "../../../data/interface/media/IImage";

interface IBlockMoreOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The heading of the block more
	 */
	heading: string;
	/**
	 * @property
	 * @description The array of tags linked to the block more
	 */
	tags: Array<ITag>;
	/**
	 * @property
	 * @description The array of article teasers
	 */
	articles: Array<{
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
		target: string;
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
	}>
}

export default IBlockMoreOptions;
