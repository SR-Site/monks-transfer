import IDefaultComponentOptions from "../IDefaultComponentOptions";

export interface IBlockFilterContentOptions extends IDefaultComponentOptions
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
	 * @description The array containing the available filters
	 */
	filters: Array<{
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
}

export default IBlockFilterContentOptions;
