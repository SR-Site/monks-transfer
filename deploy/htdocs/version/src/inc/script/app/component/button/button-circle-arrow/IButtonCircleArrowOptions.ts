import IDefaultButtonOptions from "../IDefaultButtonOptions";
import Direction from "../../../data/enum/layout/Direction";
import Alignment from "../../../data/enum/layout/Alignment";

export interface IButtonCircleArrowOptions extends IDefaultButtonOptions
{
	arrowDirection: Direction;
	arrowPosition: Alignment;
}

export default IButtonCircleArrowOptions;
