import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import INewsArticle from "../../../data/interface/INewsArticle";

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
	articles: Array<INewsArticle>;
	/**
	 * @property
	 * @description The link added to the latest options block
	 */
	link: ILink;
}

export default IBlockLatestOptions;

