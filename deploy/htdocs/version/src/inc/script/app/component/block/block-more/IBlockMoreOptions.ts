import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ITag from "../../../data/interface/action/ITag";
import {IBlockArticleTeaserOptions} from "../block-article-teaser/IBlockArticleTeaserOptions";
import IArticleTeaser from "../../../data/interface/media/IArticleTeaser";

export interface IBlockMoreOptions extends IDefaultComponentOptions
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
	articles: Array<IArticleTeaser>
}

export default IBlockMoreOptions;
