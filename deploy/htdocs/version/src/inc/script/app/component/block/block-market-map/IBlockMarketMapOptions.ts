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
		 * @description The name of the service person
		 */
		name: string;
		/**
		 * @property
		 * @description The role of the service person
		 */
		role: string;
		/**
		 * @property
		 * @description The image of the service person
		 */
		image: IImage;
	};
	/**
	 * @property
	 * @description The label of the search button
	 */
	searchLabel: string;
}

export default IBlockMarketMapOptions;
