import IDefaultComponentTransitionOptions from "../../util/component-transition/abstract-transition-component/IAbstractTransitionComponentOptions";
import PercentageLoaderBorderType from "./enum/PercentageLoaderBorderType";

interface IPercentageLoaderOptions extends IDefaultComponentTransitionOptions
{
	value: number|string;
	borderType: PercentageLoaderBorderType;
}

export default IPercentageLoaderOptions;
