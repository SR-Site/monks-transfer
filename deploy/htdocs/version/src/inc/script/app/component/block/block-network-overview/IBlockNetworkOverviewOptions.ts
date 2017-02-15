import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ILink from "../../../data/interface/action/ILink";
import IImage from "../../../data/interface/media/IImage";

interface IBlockNetworkOverviewOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The array of networks displayed in the block
	 */
	items: Array<{
		/**
		 * @property
		 * @description The link when clicked on a item
		 */
		link: ILink;
		/**
		 * @property
		 * @descrioption The logo of the network
		 */
		image: IImage;
	}>
}

export default IBlockNetworkOverviewOptions;
