import IAbstractTransitionComponentOptions from "./IAbstractTransitionComponentOptions";
import AbstractComponentViewModel from "../../../../lib/temple/component/AbstractComponentViewModel";
import DefaultSubTransitionController from "./AbstractTransitionComponentController";

abstract class AbstractTransitionComponentViewModel<T, U extends IAbstractTransitionComponentOptions> extends AbstractComponentViewModel<DefaultSubTransitionController<T, U>, U>
{
	public controller: T & any;
}

export default AbstractTransitionComponentViewModel;