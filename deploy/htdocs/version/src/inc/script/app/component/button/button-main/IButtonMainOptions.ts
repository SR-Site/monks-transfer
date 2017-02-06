import IDefaultButtonOptions from "../IAbstractButtonOptions";
import Theme from "../../../data/enum/style/Theme";

interface IButtonMainOptions extends IDefaultButtonOptions
{
	theme:Theme;
}

export default IButtonMainOptions;
