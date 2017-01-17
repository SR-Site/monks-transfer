import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ITag from "../../../data/interface/action/ITag";
import {IBlockArticleTeaserOptions} from "../block-article-teaser/IBlockArticleTeaserOptions";

export interface IBlockMoreOptions extends IDefaultComponentOptions
{
	heading: string;
	tags: Array<ITag>;
	articles: Array<IBlockArticleTeaserOptions>
}

export default IBlockMoreOptions;
