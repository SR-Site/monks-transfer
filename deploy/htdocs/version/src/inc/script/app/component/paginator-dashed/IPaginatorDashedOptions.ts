import IDefaultComponentTransitionOptions from "../../util/component-transition/abstract-transition-component/IAbstractTransitionComponentOptions";
import Orientation from "../../data/enum/layout/Orientation";

export interface IPaginatorDashedOptions extends IDefaultComponentTransitionOptions {

	/**
	 * @property
	 * @description Array containing the amount of paginator items
	 */
	items:Array<any>;

	/**
	 * @property
	 * @description The active paginator index
	 */
	currentPage:KnockoutObservable<number>;

	/**
	 * @property
	 * @description The style orientation of the component (vertical/horizontal)
	 */
	orientation?:Orientation;
}

export default IPaginatorDashedOptions;
