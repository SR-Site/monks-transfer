import MapTertiarySlideType from "../../component/block/block-map-tertiary/enum/MapTertiarySlideType";
import IImage from "./media/IImage";

interface ITertiaryMapSlide
{
	/**
	 * @property
	 * @description The slide type
	 */
		type: MapTertiarySlideType;
	/**
	 * @property
	 * @description The main heading on the slide
	 */
	heading: string;
	/**
	 * @property
	 * @description The secondary heading on the slide
	 */
	subHeading: string;
	/**
	 * @property
	 * @description The extra information paragraph displayed on the slide
	 */
	paragraph?: string;
	/**
	 * @property
	 * @description The background image of the slide
	 */
	background:IImage;
	/**
	 * @property
	 * @description The statistics showed on the slide
	 */
	statistics: Array<{
		/**
		 * @property
		 * @description Sometimes we want to display an icon
		 */
		icon?: string;
		/**
		 * @property
		 * @description A short description for the value
		 */
		label: string | {top: string;middle?: string;bottom?: string};
		/**
		 * @property
		 * @description The value of the statistic
		 */
		value: string | {top: string; bottom: string;};
	}>
}

export default ITertiaryMapSlide;