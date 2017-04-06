import IAbstractTransitionComponentOptions from "../../../../../util/component-transition/abstract-transition-component/IAbstractTransitionComponentOptions";

interface ISlideTextOptions extends IAbstractTransitionComponentOptions
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
	slideData: {
		/**
		 * @property
		 * @description The label for the slide
		 */
		label: string;
		/**
		 * @property
		 * @description The main heading for the slide
		 */
		heading: string;
		/**
		 * @property
		 * @description The paragraph displayed on the slide
		 */
		paragraph: string;
	}
}

export default ISlideTextOptions;
