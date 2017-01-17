import IBlock from "../block/IBlock";
import IIndexable from "../../../../lib/temple/core/IIndexable";
import Theme from "../../enum/style/Theme";

interface IPageLayout extends IIndexable
{
	blocks:Array<IBlock>;
	pageTitle:string;
	headerTheme:Theme;
}

export default IPageLayout;
