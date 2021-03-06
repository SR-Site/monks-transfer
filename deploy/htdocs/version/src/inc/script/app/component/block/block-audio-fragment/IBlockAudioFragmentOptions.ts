import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";

interface IBlockAudioFragmentOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The name displayed above the audio fragment
	 */
	name: string;
	/**
	 * @property
	 * @description The description about the name
	 */
	description: string;
	/**
	 * @property
	 * @description The image linked to the audio fragment
	 */
	image: IImage;
	/**
	 * @property
	 * @description The *.mp3 file that will be played
	 * @defaultValue /path/to/file.mp3
	 */
	file: string;
}

export default IBlockAudioFragmentOptions;
