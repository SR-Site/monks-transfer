import IDefaultComponentOptions from "../IDefaultComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import Alignment from "../../../data/enum/layout/Alignment";

export interface IBlockButtonOptions extends IDefaultComponentOptions
{
	link: ILink;
	alignment: Alignment;
}

export default IBlockButtonOptions;
