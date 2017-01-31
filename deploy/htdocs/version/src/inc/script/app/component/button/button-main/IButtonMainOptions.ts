import IDefaultButtonOptions from "../IAbstractButtonOptions";
import Theme from "../../../data/enum/style/Theme";

export interface IButtonMainOptions extends IDefaultButtonOptions
{
	theme:Theme;
}

export default IButtonMainOptions;
