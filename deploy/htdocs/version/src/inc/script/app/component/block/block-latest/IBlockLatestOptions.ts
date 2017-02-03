import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import ITag from "../../../data/interface/action/ITag";
import IImage from "../../../data/interface/media/IImage";


export interface IBlockLatestOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The heading of the latest block
	 */
	heading: string;
	/**
	 * @property
	 * @description The array of articles added to this block
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
	}>;
	/**
	 * @property
	 * @description The link added to the latest options block
	 */
	link: ILink;
}

export default IBlockLatestOptions;

