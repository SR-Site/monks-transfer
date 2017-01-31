import IDefaultComponentTransitionOptions from "../../util/component-transition/abstract-transition-component/IAbstractTransitionComponentOptions";

export interface IMapSliderOptions extends IDefaultComponentTransitionOptions
{
	steps: Array<{label: string}>;
}

export default IMapSliderOptions;
