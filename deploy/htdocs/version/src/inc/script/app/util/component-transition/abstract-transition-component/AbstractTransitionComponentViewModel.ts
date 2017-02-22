import IAbstractTransitionComponentOptions from "./IAbstractTransitionComponentOptions";
import AbstractComponentViewModel from "../../../../lib/temple/component/AbstractComponentViewModel";
import AbstractTransitionComponentController from "./AbstractTransitionComponentController";

abstract class AbstractTransitionComponentViewModel<TController extends AbstractTransitionComponentController<any, any, any>, TOptions extends IAbstractTransitionComponentOptions>
extends AbstractComponentViewModel<TController, TOptions>
{
	controller: TController;
}

export default AbstractTransitionComponentViewModel;