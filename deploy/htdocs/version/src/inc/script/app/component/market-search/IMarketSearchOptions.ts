import IAbstractTransitionComponentOptions from "app/util/component-transition/abstract-transition-component/IAbstractTransitionComponentOptions";

interface IMarketSearchOptions extends IAbstractTransitionComponentOptions
{
	/**
	 * @property
	 * @description The label for the search button
	 */
	searchlabel: string;
	/**
	 * @property
	 * @description the placeholder string displayed on the search form
	 */
	searchPlaceholder:string;
	/**
	 * @property
	 * @description notFoundMessage
	 */
	notFoundMessage:string;
}

export default IMarketSearchOptions;
