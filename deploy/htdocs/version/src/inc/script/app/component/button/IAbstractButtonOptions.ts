import ILink from "../../data/interface/action/ILink";
import IMethod from "../../data/interface/action/IMethod";
import ButtonSize from "../../data/enum/layout/ButtonSize";

interface IAbstractButtonOptions
{
	action: ILink|IMethod;
	size?: ButtonSize;
	disabled: KnockoutObservable<boolean>;
	transitionInOnInit?: boolean;
}

export default IAbstractButtonOptions;
