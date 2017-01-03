import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import {ILatestArticleTeaserOptions} from "../../latest-article-teaser/ILatestArticleTeaserOptions";

export interface IBlockLatestOptions extends IDefaultComponentOptions
{
	heading:string;
	link:ILink;
	articles:Array<ILatestArticleTeaserOptions>
}

export default IBlockLatestOptions;
