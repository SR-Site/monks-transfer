import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImageSequence from "../../../data/interface/media/IImageSequence";

interface IBlockMapOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The image sequence displayed in the map
	 */
	imageSequence: IImageSequence;
	/**
	 * @property
	 * @description The steps used to break the image sequence up
	 */
	steps: Array<{
		/**
		 * @property
		 * @description The label displayed on the step
		 */
		label: string
	}>;
}

export default IBlockMapOptions;
