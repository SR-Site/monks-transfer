import IDefaultSubTransitionOptions from "./IDefaultComponentTransitionOptions";
import AbstractComponentViewModel from "../../../../lib/temple/component/AbstractComponentViewModel";
import DefaultSubTransitionController from "./DefaultComponentTransitionController";

class DefaultComponentTransitionViewModel<T, U extends IDefaultSubTransitionOptions> extends AbstractComponentViewModel<DefaultSubTransitionController<T, U>, U>
{
	public controller: T & any;
}

export default DefaultComponentTransitionViewModel;