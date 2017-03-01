import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import MapTertiaryData from "./enum/MapTertiaryData";

interface IBlockMapTertiaryOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description There are a couple of predefined tertiary map carousels, the avialable options are defined in the enum
	 */
	tertiaryMapData: MapTertiaryData;
	/**
	 * @property
	 * @description The background displayed behind the slides
	 */
	background: IImage;
}

export default IBlockMapTertiaryOptions;
