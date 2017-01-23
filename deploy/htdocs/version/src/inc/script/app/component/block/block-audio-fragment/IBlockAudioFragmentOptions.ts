import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockAudioFragmentOptions extends IDefaultComponentOptions
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
	 */
	file: string;
}

export default IBlockAudioFragmentOptions;
