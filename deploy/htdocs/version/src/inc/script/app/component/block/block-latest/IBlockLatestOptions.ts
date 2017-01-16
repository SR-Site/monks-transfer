import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import {IBlockArticleTeaserOptions} from "../block-article-teaser/IBlockArticleTeaserOptions";

export interface IBlockLatestOptions extends IDefaultComponentOptions
{
	heading: string;
	link: ILink;
	articles: Array<IBlockArticleTeaserOptions>
}

export default IBlockLatestOptions;
