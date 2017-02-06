import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import IArticleTeaser from "../../../data/interface/media/IArticleTeaser";

interface IBlockLatestOptions extends IAbstractBlockComponentOptions
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
	articles: Array<IArticleTeaser>;
	/**
	 * @property
	 * @description The link added to the latest options block
	 */
	link: ILink;
}

export default IBlockLatestOptions;

