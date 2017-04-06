import IDefaultComponentTransitionOptions from "../../util/component-transition/abstract-transition-component/IAbstractTransitionComponentOptions";

export interface IAudioPlayerOptions extends IDefaultComponentTransitionOptions
{
	file: string;
	title:string;
}

export default IAudioPlayerOptions;
