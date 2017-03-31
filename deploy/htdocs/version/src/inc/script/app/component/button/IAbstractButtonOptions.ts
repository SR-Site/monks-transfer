import ILink from "../../data/interface/action/ILink";
import IMethod from "../../data/interface/action/IMethod";
import ButtonSize from "../../data/enum/layout/ButtonSize";
import {ITrackingData} from "../../../lib/knockout/knockout.ga";

interface IAbstractButtonOptions
{
	action: ILink | IMethod;
	gaTracking?: ITrackingData;
	size?: ButtonSize;
	disabled: KnockoutObservable<boolean>;
	transitionInOnInit?: boolean;
}

export default IAbstractButtonOptions;
