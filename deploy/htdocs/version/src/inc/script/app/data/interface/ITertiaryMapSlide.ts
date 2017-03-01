import MapTertiarySlideType from "../../component/block/block-map-tertiary/enum/MapTertiarySlideType";

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
		label: string;
		/**
		 * @property
		 * @description The value of the statistic
		 */
		value: string;
	}>
}

export default ITertiaryMapSlide;