import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import IImageSequence from "../../../data/interface/media/IImageSequence";

interface IBlockMapSecondaryOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The heading displayed on the secondary map
	 */
	heading: string;
	/**
	 * @property
	 * @description The sub heading displayed on the secondary map
	 */
	subHeading: string;
	/**
	 * @property
	 * @description The paragraph displayed on the secondary map
	 */
	paragraph: string;
	/**
	 * @property
	 * @description To save on image size the background of the image sequence is a separate image
	 */
	sequenceBackground?:IImage;
	/**
	 * @property
	 * @description The image sequence displayed in the map
	 */
	imageSequence: IImageSequence;
}

export default IBlockMapSecondaryOptions;
