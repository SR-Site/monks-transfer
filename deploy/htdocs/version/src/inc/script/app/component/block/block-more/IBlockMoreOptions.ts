import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ITag from "../../../data/interface/action/ITag";
import INewsArticle from "../../../data/interface/INewsArticle";

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
	articles: Array<INewsArticle>
}

export default IBlockMoreOptions;
