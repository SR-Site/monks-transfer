import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import IArticleTeaser from "../../../data/interface/media/IArticleTeaser";

export interface IBlockLatestOptions extends IDefaultComponentOptions
{
	/**
	 * @property
	 * @description The heading of the latest block
	 */
	heading: string;
	/**
	 * @property
	 * @description The link added to the latest options block
	 */
	link: ILink;
	/**
	 * @property
	 * @description The array of articles added to this block
	 */
	articles: Array<IArticleTeaser>
}

export default IBlockLatestOptions;