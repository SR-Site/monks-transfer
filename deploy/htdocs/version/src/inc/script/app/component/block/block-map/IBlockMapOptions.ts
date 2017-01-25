import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImageSequence from "../../../data/interface/media/IImageSequence";

export interface IBlockMapOptions extends IDefaultComponentOptions
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
