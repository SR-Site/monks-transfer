import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImageSequence from "../../../data/interface/media/IImageSequence";
import IImage from "../../../data/interface/media/IImage";

interface IBlockMapOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The image sequence displayed in the map
	 */
	imageSequence: IImageSequence;
	/**
	 * @property
	 * @description To save on image size the background of the image sequence is a separate image
	 */
	sequenceBackground?:IImage;
	/**
	 * @property
	 * @description The steps used to break the image sequence up
	 */
	steps: Array<{
		/**
		 * @property
		 * @description The label displayed on the step
		 */
		label: string;
		/**
		 * @property
		 * @description The heading displayed in the carousel
		 */
		heading:string;
		/**
		 * @property
		 * @description The paragraph displayed in the carousel
		 */
		paragraph:string;
	}>;
}

export default IBlockMapOptions;
