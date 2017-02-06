import IDefaultComponentTransitionOptions from "../../util/component-transition/abstract-transition-component/IAbstractTransitionComponentOptions";

interface IMapSliderOptions extends IDefaultComponentTransitionOptions
{
	steps: Array<{label: string}>;
}

export default IMapSliderOptions;
