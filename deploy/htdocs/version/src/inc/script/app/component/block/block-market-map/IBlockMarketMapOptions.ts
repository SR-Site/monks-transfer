import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";

interface IBlockMarketMapOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The service displayed in the right bottom corner
	 */
	service: {
		/**
		 * @property
		 * @description The heading displayed in the service panel
		 */
		heading:string;
	};
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

export default IBlockMarketMapOptions;
