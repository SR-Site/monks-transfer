import IDefaultComponentTransitionOptions from "app/util/component-transition/default-component-transition/IDefaultComponentTransitionOptions";
import IImage from "../../data/interface/media/IImage";
import ITag from "../../data/interface/action/ITag";

export interface ILatestArticleTeaserOptions extends IDefaultComponentTransitionOptions
{
	heading:string;
	paragraph:string;
	image:IImage;
	tags:Array<ITag>
}

export default ILatestArticleTeaserOptions;
