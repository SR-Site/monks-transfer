import ITertiaryMapSlide from "../../../../../data/interface/ITertiaryMapSlide";

import IAbstractTransitionComponentOptions from "../../../../../util/component-transition/abstract-transition-component/IAbstractTransitionComponentOptions";

interface ISlideRadialProgressOptions extends IAbstractTransitionComponentOptions
{
	/**
	 * @property
	 * @description The index of the slide
	 */
	index: number;
	/**
	 * @property
	 * @description The data for the slide
	 */
	slideData: ITertiaryMapSlide
}

export default ISlideRadialProgressOptions;
