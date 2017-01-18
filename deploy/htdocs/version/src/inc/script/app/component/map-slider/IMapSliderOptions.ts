import IDefaultComponentTransitionOptions from "app/util/component-transition/default-component-transition/IDefaultComponentTransitionOptions";

export interface IMapSliderOptions extends IDefaultComponentTransitionOptions
{
	steps: Array<{label: string}>;
}

export default IMapSliderOptions;
