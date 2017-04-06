import IIndexable from "../../../lib/temple/core/IIndexable";
import ITertiaryMapSlide from "./ITertiaryMapSlide";

interface ITertiaryMapData extends IIndexable
{
	/**
	 * @property
	 * @description the slides displayed in the gallery
	 */
	slides: Array<ITertiaryMapSlide>
}

export default ITertiaryMapData;