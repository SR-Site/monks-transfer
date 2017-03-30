import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import MapTertiaryData from "./enum/MapTertiaryData";

interface IBlockMapTertiaryOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description There are a couple of predefined tertiary map carousels, the avialable options are defined in the enum
	 */
	tertiaryMapData: MapTertiaryData;
}

export default IBlockMapTertiaryOptions;
