import IAbstractTransitionComponentOptions from "app/util/component-transition/abstract-transition-component/IAbstractTransitionComponentOptions";
import ITertiaryMapSlide from "../../data/interface/ITertiaryMapSlide";

interface IMapPaginationOptions extends IAbstractTransitionComponentOptions
{
	slides: KnockoutObservableArray<ITertiaryMapSlide|{label: string; heading: string; paragraph: string;}>;
}

export default IMapPaginationOptions;
