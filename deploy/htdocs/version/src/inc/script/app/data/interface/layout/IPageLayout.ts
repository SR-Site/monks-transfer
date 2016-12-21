import IBlock from "../block/IBlock";
import IIndexable from "../../../../lib/temple/core/IIndexable";

interface IPageLayout extends IIndexable
{
	blocks:Array<IBlock>;
	pageTitle:string;
}

export default IPageLayout;
