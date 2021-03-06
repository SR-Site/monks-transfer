import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";

export interface IBlockFilterContentOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The endpoint used for loading more filter content
	 * @placeholder api/v1/path/to/endpoint
	 */
	endpoint: string;
	/**
	 * @property
	 * @description The main label that indicates the filters
	 */
	filterLabel: string;
	/**
	 * @property
	 * @description The label for apply the filter
	 */
	applyLabel: string;
	/**
	 * @property
	 * @description The array containing the available filters
	 */
	filters: Array<{
		/**
		 * @property
		 * @description The label linked to the filter
		 */
		label:string;
		/**
		 * @property
		 * @description The type of the filter
		 */
		type: number;
		/**
		 * @property
		 * @description The options available after selecting a filter
		 * @defaultValue []
		 */
		options: Array<{
			/**
			 * @property
			 * @description Internal value of the available option
			 */
			value: string;
			/**
			 * @property
			 * @description The displayed value of the available option
			 */
			label: string;
		}>
	}>;

	/**
	 * @property
	 * @description The load more button label
	 */
	loadMoreLabel: string;

}

export default IBlockFilterContentOptions;
