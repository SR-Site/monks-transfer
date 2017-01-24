import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import ILink from "../../../data/interface/action/ILink";

export interface IBlockHeroMainOptions extends IDefaultComponentOptions
{
	/**
	 * @property
	 * @description The array containing the slides on the main carousel
	 */
	slides: Array<IHeroMainSlide>
}

interface IHeroMainSlide
{
	/**
	 * @property
	 * @description The main heading
	 */
	heading: string;
	/**
	 * @property
	 * @description The main paragraph
	 */
	paragraph?: string;
	/**
	 * @property
	 * @description The slide background image
	 */
	background: IImage;
	/**
	 * @property
	 * @description The slide link
	 */
	link?: ILink;
	/**
	 * @property
	 * @description The slide secondary link
	 */
	secondaryLink?: ILink;
	/**
	 * @property
	 * @description The slide statistics section
	 */
	statistics?: IHeroMainSlideStatistics;
}

interface IHeroMainSlideStatistics
{
	/**
	 * @property
	 * @description The statistics heading
	 */
	heading: string;
	/**
	 * @property
	 * @description The statistics to be displayed
	 */
	stats: Array<{
		/**
		 * @property
		 * @description The heading added to the statistic
		 */
		heading: string;
		/**
		 * @property
		 * @description The description about the statistic
		 */
		description: string;
		/**
		 * @property
		 * @description The value of the statistic
		 */
		value: number;
	}>
}

export default IBlockHeroMainOptions;
